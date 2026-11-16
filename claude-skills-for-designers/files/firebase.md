# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- [Framework: Next.js / React / Vue / etc.]
- TypeScript
- [Styling: Tailwind CSS / CSS Modules / etc.]
- **Firebase** (Firestore, Auth, Cloud Functions, Hosting, Storage)

## Backend: Firebase

This project uses Firebase as the backend — Firestore for the database, Firebase Auth for authentication, Cloud Functions for server-side logic, Firebase Hosting for deployment, and Cloud Storage for files.

### Project Setup

```bash
npm install firebase         # Client SDK
npm install firebase-admin   # Server SDK (Cloud Functions, server-side)
```

```ts
// lib/firebase/config.ts — client initialization
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
```

```ts
// lib/firebase/admin.ts — server-side (Cloud Functions, API routes)
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
```

### Firestore Data Modeling

Firestore is a document-based NoSQL database organized into collections and documents.

```
users/                            # Collection
  {userId}/                       # Document
    displayName: "Jane"
    email: "jane@example.com"
    createdAt: Timestamp
    posts/                        # Subcollection
      {postId}/                   # Document
        title: "My Post"
        content: "..."
        published: true
        createdAt: Timestamp
        tags: ["design", "ai"]

products/                         # Top-level collection
  {productId}/
    name: "Skill Files Pack"
    price: 29
    category: "templates"
    createdAt: Timestamp
```

**Data modeling rules:**
- Denormalize data — duplicate what you read together (Firestore charges per read)
- Keep documents small — store lists as subcollections if they can grow large
- Use subcollections for 1-to-many relationships that you query independently
- Use embedded arrays/maps for small, bounded data you always read with the parent
- Never nest more than 2 levels deep (collection → document → subcollection → document)

**Denormalization example:**

```ts
// When a user updates their display name, update it everywhere it's referenced
// Store author info directly on the post (avoid extra reads)
const postData = {
  title: 'My Post',
  content: '...',
  author: {
    uid: userId,
    displayName: 'Jane',     // Denormalized — copied from users collection
    avatarUrl: '...',         // Denormalized
  },
  createdAt: serverTimestamp(),
};
```

### Firestore Queries

```ts
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter, onSnapshot, serverTimestamp
} from 'firebase/firestore';

// Get a single document
const docSnap = await getDoc(doc(db, 'posts', postId));
if (docSnap.exists()) {
  const post = { id: docSnap.id, ...docSnap.data() };
}

// Query a collection
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(20)
);
const snapshot = await getDocs(q);
const posts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

// Add a document (auto-generated ID)
const docRef = await addDoc(collection(db, 'posts'), {
  title: 'New Post',
  content: '...',
  authorId: userId,
  createdAt: serverTimestamp(),
});

// Update a document
await updateDoc(doc(db, 'posts', postId), {
  title: 'Updated Title',
  updatedAt: serverTimestamp(),
});

// Delete a document
await deleteDoc(doc(db, 'posts', postId));
```

**Compound indexes:** Queries that combine `where` on one field with `orderBy` on another need a composite index. Firestore will log an error with a link to create it — click that link.

### Real-Time Listeners

```ts
// Listen to a single document
const unsubscribe = onSnapshot(doc(db, 'posts', postId), (docSnap) => {
  if (docSnap.exists()) {
    setPost({ id: docSnap.id, ...docSnap.data() });
  }
});

// Listen to a query
const q = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc')
);
const unsubscribe = onSnapshot(q, (snapshot) => {
  const posts = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  setPosts(posts);
});

// Always clean up listeners
useEffect(() => {
  const unsub = onSnapshot(/* ... */);
  return () => unsub(); // Cleanup on unmount
}, []);
```

### Security Rules

Firestore security rules control who can read/write data:

```
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read/write their own profile
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Posts: anyone can read published, only author can write
    match /posts/{postId} {
      allow read: if resource.data.published == true
                  || request.auth.uid == resource.data.authorId;
      allow create: if request.auth != null
                    && request.resource.data.authorId == request.auth.uid;
      allow update, delete: if request.auth != null
                            && request.auth.uid == resource.data.authorId;
    }

    // Subcollection: comments on posts
    match /posts/{postId}/comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.authorId;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**Rules:**
- Default deny everything, then open specific paths
- Always validate `request.auth != null` before allowing writes
- Validate data shape in rules with `request.resource.data`
- Test rules with the Firebase Emulator before deploying

### Authentication

```ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, signOut, onAuthStateChanged,
  GoogleAuthProvider, GithubAuthProvider
} from 'firebase/auth';

// Email/password signup
const { user } = await createUserWithEmailAndPassword(auth, email, password);

// Email/password login
const { user } = await signInWithEmailAndPassword(auth, email, password);

// Google OAuth
const provider = new GoogleAuthProvider();
const { user } = await signInWithPopup(auth, provider);

// Apple OAuth
import { OAuthProvider } from 'firebase/auth';
const appleProvider = new OAuthProvider('apple.com');
const { user } = await signInWithPopup(auth, appleProvider);

// Anonymous auth (for guest users)
import { signInAnonymously } from 'firebase/auth';
const { user } = await signInAnonymously(auth);

// Sign out
await signOut(auth);

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Signed in:', user.uid);
  } else {
    console.log('Signed out');
  }
});
```

### Cloud Functions

Server-side logic that runs in response to events or HTTP requests:

```ts
// functions/src/index.ts
import { onCall, onRequest } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';

initializeApp();
const db = getFirestore();

// Callable function (called from client with Firebase SDK)
export const createPost = onCall(async (request) => {
  if (!request.auth) throw new Error('Unauthenticated');

  const { title, content } = request.data;
  const docRef = await db.collection('posts').add({
    title,
    content,
    authorId: request.auth.uid,
    createdAt: new Date(),
  });

  return { id: docRef.id };
});

// HTTP function (REST endpoint)
export const api = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  // Handle request
  res.json({ success: true });
});

// Firestore trigger — runs when a document is created
export const onPostCreated = onDocumentCreated('posts/{postId}', async (event) => {
  const postData = event.data?.data();
  // Send notification, update counters, etc.
  await db.doc(`users/${postData?.authorId}`).update({
    postCount: FieldValue.increment(1),
  });
});
```

### Cloud Storage

```ts
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Upload a file
const fileRef = ref(storage, `avatars/${userId}/profile.jpg`);
await uploadBytes(fileRef, file);
const downloadUrl = await getDownloadURL(fileRef);

// Delete a file
await deleteObject(ref(storage, `avatars/${userId}/profile.jpg`));
```

Storage security rules:

```
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{userId}/{fileName} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024  // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### Firebase Emulator Suite

Local development without hitting production:

```bash
firebase emulators:start
```

```ts
// Connect to emulators in development
import { connectFirestoreEmulator } from 'firebase/firestore';
import { connectAuthEmulator } from 'firebase/auth';
import { connectStorageEmulator } from 'firebase/storage';

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

### File Structure

```
[project-root]/
├── lib/
│   ├── firebase/
│   │   ├── config.ts          # Client SDK init
│   │   └── admin.ts           # Admin SDK init (server-only)
│   └── hooks/
│       ├── useAuth.ts         # Auth state hook
│       └── useFirestore.ts    # Data fetching hooks
├── functions/                 # Cloud Functions
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── firestore.rules            # Security rules
├── storage.rules              # Storage security rules
├── firestore.indexes.json     # Compound indexes
├── firebase.json              # Firebase project config
├── .firebaserc                # Project aliases
└── .env.local                 # Firebase config keys
```

### Anti-Patterns — Do NOT

- Read entire collections when you only need a few documents — always filter with `where()` and `limit()`
- Deeply nest subcollections beyond 2 levels — flatten your data model
- Forget to unsubscribe from `onSnapshot` listeners — causes memory leaks
- Store large arrays in documents (1MB document limit) — use subcollections instead
- Skip security rules — the default test-mode rules expire and leave data exposed
- Use `getDocs()` in a loop — batch reads or restructure your data model
- Import the entire Firebase SDK — use modular imports (`firebase/firestore`, not `firebase`)
- Store sensitive data (API keys, secrets) in Firestore documents — use environment variables
- Rely on client-side validation alone — security rules are the real access control
- Forget compound indexes — Firestore will error on queries that need them
- Use `getDoc()` on the server when you have Admin SDK — use `adminDb.doc().get()` instead
- Ignore the emulator suite — test locally before deploying rules and functions

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- All data access through typed helper functions (not raw Firestore calls in components)
- Security rules tested with emulator before every deploy
- Cloud Functions for server-side logic and background tasks
- Real-time listeners for data that changes frequently
- One-time reads (`getDoc`/`getDocs`) for static or rarely-changing data

## Notes

[Any project-specific context — Firebase project ID, plan tier, enabled services]
