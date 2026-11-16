# [Project Name]

[Brief description of what this project does.]

---

## Capability: Real-Time Features

This project includes real-time functionality. Live data flows between server and clients without page refreshes, enabling collaborative features, live notifications, and instant UI updates.

### Architecture Decision

Choose the right transport for the use case.

| Transport | Direction | Best For |
|-----------|-----------|----------|
| WebSocket | Bidirectional | Chat, collaboration, gaming, live cursors |
| Server-Sent Events (SSE) | Server → Client | Notifications, feed updates, progress streams |
| Polling | Client → Server | Simple status checks, fallback when WS/SSE unavailable |
| Supabase Realtime | Bidirectional | Database-driven real-time (row changes, presence, broadcast) |
| Socket.io | Bidirectional | WebSocket with rooms, namespaces, auto-reconnect |

### WebSocket (Native API)

**Client connection:**
```ts
class RealtimeClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners = new Map<string, Set<(data: any) => void>>();

  connect(url: string) {
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      console.log("Connected");
      this.reconnectAttempts = 0;
      this.emit("connection", { status: "connected" });
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.emit(message.type, message.data);
    };

    this.ws.onclose = (event) => {
      this.emit("connection", { status: "disconnected" });
      if (!event.wasClean) this.reconnect(url);
    };

    this.ws.onerror = () => {
      this.emit("connection", { status: "error" });
    };
  }

  private reconnect(url: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit("connection", { status: "failed" });
      return;
    }
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    this.emit("connection", { status: "reconnecting", attempt: this.reconnectAttempts });
    setTimeout(() => this.connect(url), delay);
  }

  send(type: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  on(type: string, callback: (data: any) => void) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type)!.add(callback);
    return () => this.listeners.get(type)?.delete(callback);
  }

  private emit(type: string, data: any) {
    this.listeners.get(type)?.forEach((cb) => cb(data));
  }

  disconnect() {
    this.ws?.close();
  }
}
```

**React hook:**
```tsx
function useRealtime(url: string) {
  const [status, setStatus] = useState<"connecting" | "connected" | "disconnected" | "reconnecting">("connecting");
  const clientRef = useRef<RealtimeClient | null>(null);

  useEffect(() => {
    const client = new RealtimeClient();
    clientRef.current = client;

    const unsub = client.on("connection", ({ status }) => setStatus(status));
    client.connect(url);

    return () => {
      unsub();
      client.disconnect();
    };
  }, [url]);

  const send = useCallback((type: string, data: any) => {
    clientRef.current?.send(type, data);
  }, []);

  const on = useCallback((type: string, cb: (data: any) => void) => {
    return clientRef.current?.on(type, cb) ?? (() => {});
  }, []);

  return { status, send, on };
}
```

### Server-Sent Events (SSE)

Simpler than WebSocket when you only need server-to-client streaming.

**Server (Node.js / Next.js API route):**
```ts
// app/api/events/route.ts
export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection message
      controller.enqueue(encoder.encode("data: {\"type\":\"connected\"}\n\n"));

      // Example: send updates every 5 seconds
      const interval = setInterval(() => {
        const data = JSON.stringify({ type: "update", data: { timestamp: Date.now() } });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      }, 5000);

      // Clean up on disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
```

**Client:**
```ts
function useSSE(url: string) {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<"connecting" | "connected" | "error">("connecting");

  useEffect(() => {
    const source = new EventSource(url);

    source.onopen = () => setStatus("connected");
    source.onerror = () => setStatus("error");

    source.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      setData(parsed);
    };

    return () => source.close();
  }, [url]);

  return { data, status };
}
```

### Optimistic Updates

Update the UI immediately, then reconcile with the server response.

```tsx
function useOptimisticMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string) => {
    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      text,
      status: "sending",
      createdAt: new Date().toISOString(),
    };

    // Show immediately
    setMessages((prev) => [...prev, optimistic]);

    try {
      const saved = await api.sendMessage(text);

      // Replace optimistic with server response
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? { ...saved, status: "sent" } : m))
      );
    } catch {
      // Mark as failed
      setMessages((prev) =>
        prev.map((m) => (m.id === optimistic.id ? { ...m, status: "failed" } : m))
      );
    }
  };

  return { messages, sendMessage };
}
```

**Conflict resolution strategies:**
- **Last write wins** — simplest. Server timestamp determines the final state.
- **Operational transform** — complex. Transforms concurrent edits (Google Docs approach).
- **CRDTs** — conflict-free data types that merge automatically (Yjs, Automerge).

For most apps, last-write-wins is sufficient. Use CRDTs only for collaborative text editing.

### Presence (Who's Online)

```tsx
// Track connected users
function usePresence(channel: string) {
  const [users, setUsers] = useState<PresenceUser[]>([]);
  const { send, on } = useRealtime(`/ws/${channel}`);

  useEffect(() => {
    // Announce presence
    send("presence:join", { userId: currentUser.id, name: currentUser.name });

    // Listen for presence updates
    const unsubJoin = on("presence:join", (user) => {
      setUsers((prev) => [...prev.filter((u) => u.userId !== user.userId), user]);
    });

    const unsubLeave = on("presence:leave", ({ userId }) => {
      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    });

    const unsubSync = on("presence:sync", (allUsers) => {
      setUsers(allUsers);
    });

    return () => {
      send("presence:leave", { userId: currentUser.id });
      unsubJoin();
      unsubLeave();
      unsubSync();
    };
  }, [channel]);

  return users;
}
```

**Presence UI:**
```tsx
function OnlineIndicator({ users }: { users: PresenceUser[] }) {
  return (
    <div className="flex -space-x-2">
      {users.slice(0, 5).map((user) => (
        <div
          key={user.userId}
          className="w-8 h-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-xs text-white"
          title={user.name}
        >
          {user.name[0]}
        </div>
      ))}
      {users.length > 5 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-xs">
          +{users.length - 5}
        </div>
      )}
    </div>
  );
}
```

### Typing Indicators

```tsx
function useTypingIndicator(channel: string) {
  const { send, on } = useRealtime(`/ws/${channel}`);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const timeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const unsub = on("typing", ({ userId, name }) => {
      setTypingUsers((prev) => (prev.includes(name) ? prev : [...prev, name]));

      // Clear after 3 seconds of no typing events
      const existing = timeoutRef.current.get(userId);
      if (existing) clearTimeout(existing);
      timeoutRef.current.set(
        userId,
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((n) => n !== name));
        }, 3000)
      );
    });

    return unsub;
  }, [channel]);

  // Debounced send — don't flood with typing events
  const sendTyping = useMemo(
    () =>
      debounce(() => {
        send("typing", { userId: currentUser.id, name: currentUser.name });
      }, 500),
    [send]
  );

  return { typingUsers, sendTyping };
}

// Display
function TypingIndicator({ users }: { users: string[] }) {
  if (users.length === 0) return null;
  if (users.length === 1) return <p className="text-sm text-muted-foreground">{users[0]} is typing...</p>;
  if (users.length === 2) return <p className="text-sm text-muted-foreground">{users[0]} and {users[1]} are typing...</p>;
  return <p className="text-sm text-muted-foreground">{users.length} people are typing...</p>;
}
```

### Real-Time Notifications

```tsx
function useNotifications() {
  const { on } = useRealtime("/ws/notifications");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const unsub = on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);

      // Show toast for high-priority
      if (notification.priority === "high") {
        toast(notification.title, { description: notification.body });
      }
    });

    return unsub;
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return { notifications, unreadCount, markRead };
}
```

### Supabase Realtime

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("[SUPABASE_URL]", "[SUPABASE_ANON_KEY]");

// Listen to database changes
function useRealtimeTable(table: string) {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    // Initial fetch
    supabase.from(table).select("*").then(({ data }) => setRows(data ?? []));

    // Subscribe to changes
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRows((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setRows((prev) => prev.map((r) => (r.id === payload.new.id ? payload.new : r)));
          } else if (payload.eventType === "DELETE") {
            setRows((prev) => prev.filter((r) => r.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [table]);

  return rows;
}

// Supabase Presence
function useSupabasePresence(roomId: string) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`room:${roomId}`);

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setUsers(Object.values(state).flat());
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId: currentUser.id,
            name: currentUser.name,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  return users;
}
```

### Socket.io Patterns

```ts
// Client
import { io } from "socket.io-client";

const socket = io("[SERVER_URL]", {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Rooms
socket.emit("join-room", { roomId: "[room-id]" });
socket.on("room-message", (data) => { /* handle */ });

// Acknowledgments
socket.emit("save-document", { content: "..." }, (response: { ok: boolean }) => {
  if (response.ok) console.log("Saved");
});

// Namespaces (separate concerns)
const chatSocket = io("/chat");
const notifSocket = io("/notifications");
```

### Connection State UI

Always show connection status to the user.

```tsx
function ConnectionStatus({ status }: { status: string }) {
  if (status === "connected") return null; // Don't show when everything's fine

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-sm",
        status === "reconnecting" && "bg-yellow-500 text-yellow-950",
        status === "disconnected" && "bg-red-500 text-white",
      )}
    >
      {status === "reconnecting" && "Reconnecting..."}
      {status === "disconnected" && "Connection lost. Trying to reconnect..."}
    </div>
  );
}
```

### Polling Fallback

Use polling when WebSocket and SSE are unavailable.

```ts
function usePoll<T>(url: string, intervalMs: number = 5000) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    let active = true;

    const poll = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        if (active) setData(json);
      } catch {
        // Silent failure — will retry on next interval
      }
    };

    poll(); // Initial fetch
    const interval = setInterval(poll, intervalMs);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [url, intervalMs]);

  return data;
}
```

### Debouncing Rapid Updates

When many updates arrive per second (live cursors, sensor data), batch them.

```ts
function useDebouncedUpdates<T>(delay: number = 100) {
  const [latest, setLatest] = useState<T | null>(null);
  const bufferRef = useRef<T | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (bufferRef.current !== null) {
        setLatest(bufferRef.current);
        bufferRef.current = null;
      }
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);

  const push = (update: T) => {
    bufferRef.current = update;
  };

  return { latest, push };
}
```

For cursor positions and mouse movements, use `requestAnimationFrame` instead of timers for smoother rendering.

### Scaling Considerations

- **Connection limits:** A single server handles ~10K WebSocket connections. Beyond that, use a pub/sub layer (Redis, NATS) between servers.
- **Message fan-out:** Broadcasting to many clients is expensive. Use rooms/channels to limit recipients.
- **Reconnection storms:** If the server restarts, all clients reconnect simultaneously. Add jitter to reconnect delays.
- **Sticky sessions:** WebSocket requires the same server for the lifetime of the connection. Use session affinity in your load balancer.
- **Heartbeats:** Send periodic pings (every 30s) to detect dead connections and prevent proxy timeouts.

### Anti-Patterns — Do NOT

- Open a WebSocket for features that only need one-way data — use SSE instead
- Skip reconnection logic — connections drop constantly on mobile and flaky networks
- Send full state on every update — send diffs or events, not the entire dataset
- Forget to clean up subscriptions on unmount — leads to memory leaks and ghost listeners
- Use polling at 1-second intervals when WebSocket is available — it wastes bandwidth and battery
- Ignore connection state in the UI — users need to know when they're offline or reconnecting
- Send typing events on every keystroke without debouncing — floods the channel
- Trust real-time data without server validation — always validate and authorize on the server
- Store real-time state only in memory — persist critical data to the database
- Skip load testing — real-time features behave differently at 10 users vs 10,000
- Use `setInterval` for polling without clearing on unmount — causes requests after navigation
- Broadcast sensitive data to all connected clients — filter per user/role on the server

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Real-time transport: [WebSocket / SSE / Supabase Realtime / Socket.io]
- Connection management centralized in a shared hook/service
- All real-time subscriptions cleaned up on component unmount
- Connection status visible to users when degraded

## Notes

[Any project-specific context — expected concurrent users, real-time features in use, infrastructure.]
