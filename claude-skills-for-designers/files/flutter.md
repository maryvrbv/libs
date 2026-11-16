# [Project Name]

[Brief description of what this project does.]

---

## Tech Stack

- Flutter 3 / Dart 3
- Material 3 (Material Design)
- [State Management: Riverpod / Bloc / Provider / etc.]
- [Navigation: GoRouter / auto_route / Navigator 2.0 / etc.]
- [Backend: Firebase / Supabase / custom REST API / etc.]
- [Local Storage: Hive / SharedPreferences / Drift / etc.]
- Targets: [iOS / Android / Web / macOS / etc.]

## Framework: Flutter 3 + Dart

This project uses Flutter 3 with Dart 3. Flutter builds natively compiled applications from a single codebase using a widget tree architecture. Everything is a widget — layouts, styling, gestures, and animations are all composed from widgets.

### Widget Fundamentals

Flutter has two core widget types:

**StatelessWidget — no internal state, pure function of its props:**
```dart
class UserAvatar extends StatelessWidget {
  const UserAvatar({
    super.key,
    required this.name,
    this.size = 40,
  });

  final String name;
  final double size;

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: size / 2,
      child: Text(name[0].toUpperCase()),
    );
  }
}
```

**StatefulWidget — has mutable state that triggers rebuilds:**
```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count', style: Theme.of(context).textTheme.headlineMedium),
        const SizedBox(height: 16),
        FilledButton(
          onPressed: () => setState(() => _count++),
          child: const Text('Increment'),
        ),
      ],
    );
  }
}
```

**Rules:**
- Default to `StatelessWidget`. Only use `StatefulWidget` when you need local, ephemeral state (animations, form fields, toggle states).
- Always use `const` constructors when possible — it prevents unnecessary rebuilds.
- Use `super.key` in constructors, not the old `Key? key` pattern.
- Prefer named parameters for widget constructors — they are self-documenting.
- Never put heavy logic in `build()` — it can be called 60 times per second.

### Dart Conventions

**Named parameters and null safety:**
```dart
// Prefer named parameters for clarity
void createUser({
  required String name,
  required String email,
  String? avatarUrl,
  int age = 0,
}) {
  // ...
}

// Call with named parameters
createUser(name: 'Alice', email: 'alice@example.com');
```

**Null safety patterns:**
```dart
String? maybeNull;

// Null-aware operators
final length = maybeNull?.length ?? 0;
final upper = maybeNull?.toUpperCase();

// Null assertion (use sparingly — prefer null checks)
final definitelyNotNull = maybeNull!;

// Pattern matching (Dart 3)
if (maybeNull case final value?) {
  print(value); // value is non-null String here
}
```

**Async/await:**
```dart
Future<User> fetchUser(String id) async {
  final response = await http.get(Uri.parse('$baseUrl/users/$id'));
  if (response.statusCode != 200) {
    throw ApiException('Failed to fetch user: ${response.statusCode}');
  }
  return User.fromJson(jsonDecode(response.body));
}

// Stream handling
Stream<int> countStream() async* {
  for (var i = 0; i < 10; i++) {
    await Future.delayed(const Duration(seconds: 1));
    yield i;
  }
}
```

**Records and pattern matching (Dart 3):**
```dart
// Records for lightweight data
(String, int) userInfo() => ('Alice', 30);

// Pattern matching
switch (status) {
  case 'loading': return const CircularProgressIndicator();
  case 'error': return Text('Error: $message');
  case 'success': return DataView(data: data);
}
```

### Material 3 Theming

Use Material 3's `ColorScheme` and `TextTheme` for consistent design. Never hardcode colors or text styles.

```dart
// lib/core/theme/app_theme.dart
import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData light() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFF6750A4),
      brightness: Brightness.light,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      textTheme: _textTheme,
      appBarTheme: AppBarTheme(
        backgroundColor: colorScheme.surface,
        foregroundColor: colorScheme.onSurface,
        elevation: 0,
      ),
      cardTheme: CardTheme(
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        color: colorScheme.surfaceContainerLow,
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: colorScheme.surfaceContainerHighest,
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
      ),
    );
  }

  static ThemeData dark() {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFF6750A4),
      brightness: Brightness.dark,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: colorScheme,
      textTheme: _textTheme,
    );
  }

  static const _textTheme = TextTheme(
    displayLarge: TextStyle(fontWeight: FontWeight.w400),
    headlineMedium: TextStyle(fontWeight: FontWeight.w500),
    titleLarge: TextStyle(fontWeight: FontWeight.w600),
    bodyLarge: TextStyle(fontWeight: FontWeight.w400),
    labelLarge: TextStyle(fontWeight: FontWeight.w500),
  );
}
```

**Using theme tokens in widgets — always use semantic tokens:**
```dart
@override
Widget build(BuildContext context) {
  final theme = Theme.of(context);
  final colors = theme.colorScheme;
  final textTheme = theme.textTheme;

  return Container(
    color: colors.surface,              // NOT Colors.white
    padding: const EdgeInsets.all(16),
    child: Column(
      children: [
        Text(
          'Title',
          style: textTheme.headlineMedium?.copyWith(
            color: colors.onSurface,    // NOT Colors.black
          ),
        ),
        Text(
          'Subtitle',
          style: textTheme.bodyMedium?.copyWith(
            color: colors.onSurfaceVariant,
          ),
        ),
        FilledButton(
          onPressed: () {},
          child: const Text('Action'),  // Inherits colorScheme.onPrimary
        ),
      ],
    ),
  );
}
```

**Material 3 color roles:**
- `primary` / `onPrimary` — primary actions and buttons
- `secondary` / `onSecondary` — secondary actions
- `tertiary` / `onTertiary` — accent and contrast elements
- `surface` / `onSurface` — backgrounds and body text
- `surfaceContainerLow/High` — card and container backgrounds
- `error` / `onError` — error states and validation
- `outline` / `outlineVariant` — borders and dividers

### Cupertino Widgets for iOS

For platform-adaptive UI, use Cupertino widgets on iOS when appropriate:

```dart
import 'dart:io' show Platform;
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

Widget buildAdaptiveDialog(BuildContext context, String message) {
  if (Platform.isIOS) {
    return CupertinoAlertDialog(
      title: const Text('Alert'),
      content: Text(message),
      actions: [
        CupertinoDialogAction(
          child: const Text('OK'),
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  }
  return AlertDialog(
    title: const Text('Alert'),
    content: Text(message),
    actions: [
      TextButton(
        onPressed: () => Navigator.pop(context),
        child: const Text('OK'),
      ),
    ],
  );
}
```

Use `Platform.isIOS` checks for navigation patterns (back swipe), date pickers, action sheets, and scrolling physics. Keep the core layout shared — only swap interaction-level widgets.

### Spacing & Layout

**Use `SizedBox` and `EdgeInsets` for spacing — never nest empty containers:**
```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('Title', style: textTheme.headlineMedium),
    const SizedBox(height: 8),             // Vertical spacing
    Text('Description', style: textTheme.bodyMedium),
    const SizedBox(height: 24),
    Row(
      children: [
        const Icon(Icons.calendar_today),
        const SizedBox(width: 8),          // Horizontal spacing
        Text('March 15, 2026'),
      ],
    ),
  ],
)

// Padding
Padding(
  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
  child: Text('Padded content'),
)

// Use EdgeInsets constants for consistency
class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;

  static const pagePadding = EdgeInsets.symmetric(horizontal: 16, vertical: 24);
  static const cardPadding = EdgeInsets.all(16);
  static const listItemPadding = EdgeInsets.symmetric(horizontal: 16, vertical: 12);
}
```

**Layout widgets:**
- `Column` / `Row` — flex layout (use `crossAxisAlignment` and `mainAxisAlignment`)
- `Expanded` / `Flexible` — fill available space in Row/Column
- `SizedBox` — fixed spacing, fixed size constraints
- `Padding` — wrap with padding
- `ConstrainedBox` / `SizedBox` — set min/max dimensions
- `ListView` — scrollable list (use `ListView.builder` for long lists)
- `GridView` — grid layout (use `GridView.builder` for performance)

### State Management with Riverpod

Riverpod provides compile-safe, testable state management outside the widget tree.

```dart
// lib/features/projects/providers/project_providers.dart
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'project_providers.g.dart';

// Simple async provider — fetches data
@riverpod
Future<List<Project>> projects(Ref ref) async {
  final repository = ref.watch(projectRepositoryProvider);
  return repository.getAll();
}

// Provider with parameters
@riverpod
Future<Project> project(Ref ref, String id) async {
  final repository = ref.watch(projectRepositoryProvider);
  return repository.getById(id);
}

// Notifier — manages mutable state with methods
@riverpod
class ProjectList extends _$ProjectList {
  @override
  Future<List<Project>> build() async {
    final repository = ref.watch(projectRepositoryProvider);
    return repository.getAll();
  }

  Future<void> add(CreateProjectInput input) async {
    final repository = ref.read(projectRepositoryProvider);
    await repository.create(input);
    ref.invalidateSelf(); // Refetch the list
  }

  Future<void> delete(String id) async {
    final repository = ref.read(projectRepositoryProvider);
    await repository.delete(id);
    ref.invalidateSelf();
  }
}
```

**Consuming providers in widgets:**
```dart
class ProjectsScreen extends ConsumerWidget {
  const ProjectsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final projectsAsync = ref.watch(projectsProvider);

    return projectsAsync.when(
      data: (projects) => ListView.builder(
        itemCount: projects.length,
        itemBuilder: (context, index) => ProjectCard(project: projects[index]),
      ),
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (error, stack) => Center(child: Text('Error: $error')),
    );
  }
}
```

**Rules:**
- Use `ref.watch` in `build()` to subscribe to providers and rebuild on change.
- Use `ref.read` in callbacks and event handlers — never in `build()`.
- Use `ref.listen` for side effects (showing snackbars, navigating).
- Annotate providers with `@riverpod` and run code generation with `dart run build_runner build`.
- Keep providers in the same feature folder as the widgets that use them.

### Navigation with GoRouter

GoRouter provides declarative, URL-based routing with deep linking support.

```dart
// lib/core/router/app_router.dart
import 'package:go_router/go_router.dart';

final appRouter = GoRouter(
  initialLocation: '/',
  redirect: (context, state) {
    final isLoggedIn = /* check auth state */;
    final isAuthRoute = state.matchedLocation.startsWith('/auth');

    if (!isLoggedIn && !isAuthRoute) return '/auth/login';
    if (isLoggedIn && isAuthRoute) return '/';
    return null; // No redirect
  },
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomeScreen(),
      routes: [
        GoRoute(
          path: 'projects',
          builder: (context, state) => const ProjectsScreen(),
          routes: [
            GoRoute(
              path: ':id',
              builder: (context, state) {
                final id = state.pathParameters['id']!;
                return ProjectDetailScreen(projectId: id);
              },
            ),
          ],
        ),
        GoRoute(
          path: 'settings',
          builder: (context, state) => const SettingsScreen(),
        ),
      ],
    ),
    ShellRoute(
      builder: (context, state, child) => AppShell(child: child),
      routes: [/* routes that share a scaffold/bottom nav */],
    ),
    GoRoute(
      path: '/auth/login',
      builder: (context, state) => const LoginScreen(),
    ),
  ],
);

// Navigation
context.go('/projects');              // Replace current route
context.push('/projects/abc123');     // Push onto stack
context.pop();                        // Go back
```

**Rules:**
- Use `context.go()` for top-level navigation (tab switches, auth redirects).
- Use `context.push()` for drill-down navigation (list to detail).
- Use `ShellRoute` for persistent UI (bottom nav bar, side nav).
- Define route paths as constants to avoid string typos.
- Use the `redirect` callback for auth guards — not widget-level checks.

### File Structure

```
lib/
├── main.dart                        # Entry point, ProviderScope, MaterialApp.router
├── core/
│   ├── theme/
│   │   ├── app_theme.dart           # ThemeData (light + dark)
│   │   └── app_spacing.dart         # Spacing constants
│   ├── router/
│   │   └── app_router.dart          # GoRouter configuration
│   ├── network/
│   │   ├── api_client.dart          # HTTP client setup
│   │   └── api_exceptions.dart      # Error types
│   ├── constants/
│   │   └── app_constants.dart       # App-wide constants
│   └── utils/
│       ├── extensions.dart          # Dart extension methods
│       └── formatters.dart          # Date, currency formatters
├── features/
│   ├── auth/
│   │   ├── screens/
│   │   │   ├── login_screen.dart
│   │   │   └── register_screen.dart
│   │   ├── widgets/
│   │   │   └── auth_form.dart
│   │   ├── providers/
│   │   │   └── auth_providers.dart
│   │   ├── models/
│   │   │   └── user.dart
│   │   └── repositories/
│   │       └── auth_repository.dart
│   ├── projects/
│   │   ├── screens/
│   │   │   ├── projects_screen.dart
│   │   │   └── project_detail_screen.dart
│   │   ├── widgets/
│   │   │   ├── project_card.dart
│   │   │   └── project_form.dart
│   │   ├── providers/
│   │   │   └── project_providers.dart
│   │   ├── models/
│   │   │   └── project.dart
│   │   └── repositories/
│   │       └── project_repository.dart
│   └── settings/
│       ├── screens/
│       └── providers/
├── shared/
│   ├── widgets/
│   │   ├── app_bar.dart             # Custom app bar
│   │   ├── loading_indicator.dart
│   │   └── error_view.dart
│   └── models/
│       └── pagination.dart

assets/
├── images/
├── icons/
├── fonts/
└── animations/                      # Lottie files, etc.

test/
├── features/
│   ├── auth/
│   └── projects/
├── shared/
└── core/
```

### Asset Management

Register assets in `pubspec.yaml`:
```yaml
flutter:
  assets:
    - assets/images/
    - assets/icons/
    - assets/fonts/

  fonts:
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Medium.ttf
          weight: 500
        - asset: assets/fonts/Inter-Bold.ttf
          weight: 700
```

Access assets in code:
```dart
Image.asset('assets/images/logo.png')
Image.asset('assets/icons/arrow.svg') // Use flutter_svg package for SVGs
```

### Naming Conventions

- **Files:** `snake_case.dart` — always (e.g., `project_card.dart`, `auth_repository.dart`)
- **Classes:** `PascalCase` — widgets, models, providers (e.g., `ProjectCard`, `AuthRepository`)
- **Variables/functions:** `camelCase` (e.g., `projectList`, `fetchUser`)
- **Constants:** `camelCase` (Dart convention, not SCREAMING_CASE)
- **Private members:** prefix with `_` (e.g., `_count`, `_handleTap`)
- **Directories:** `snake_case` (e.g., `project_detail/`, `shared_widgets/`)

### Patterns

**Repository pattern — abstract data sources:**
```dart
abstract class ProjectRepository {
  Future<List<Project>> getAll();
  Future<Project> getById(String id);
  Future<void> create(CreateProjectInput input);
  Future<void> delete(String id);
}

class ApiProjectRepository implements ProjectRepository {
  ApiProjectRepository(this._client);
  final ApiClient _client;

  @override
  Future<List<Project>> getAll() async {
    final response = await _client.get('/projects');
    return (response.data as List).map((e) => Project.fromJson(e)).toList();
  }
  // ...
}
```

**Model classes with freezed (or manual):**
```dart
// With freezed (code generation)
@freezed
class Project with _$Project {
  const factory Project({
    required String id,
    required String name,
    String? description,
    required DateTime createdAt,
  }) = _Project;

  factory Project.fromJson(Map<String, dynamic> json) =>
      _$ProjectFromJson(json);
}

// Manual (no code gen)
class Project {
  const Project({
    required this.id,
    required this.name,
    this.description,
    required this.createdAt,
  });

  final String id;
  final String name;
  final String? description;
  final DateTime createdAt;

  factory Project.fromJson(Map<String, dynamic> json) => Project(
    id: json['id'] as String,
    name: json['name'] as String,
    description: json['description'] as String?,
    createdAt: DateTime.parse(json['created_at'] as String),
  );
}
```

**Responsive layout:**
```dart
class ResponsiveLayout extends StatelessWidget {
  const ResponsiveLayout({
    super.key,
    required this.mobile,
    required this.tablet,
    this.desktop,
  });

  final Widget mobile;
  final Widget tablet;
  final Widget? desktop;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth >= 1200 && desktop != null) return desktop!;
        if (constraints.maxWidth >= 600) return tablet;
        return mobile;
      },
    );
  }
}
```

**Error handling with AsyncValue (Riverpod):**
```dart
ref.listen(projectsProvider, (prev, next) {
  next.whenOrNull(
    error: (error, stack) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $error')),
      );
    },
  );
});
```

### Anti-Patterns — Do NOT

- Hardcode colors — use `Theme.of(context).colorScheme` semantic tokens everywhere
- Hardcode text styles — use `Theme.of(context).textTheme` for all typography
- Use `setState` for app-level state — use Riverpod providers; `setState` is for local ephemeral state only
- Nest deeply — extract widgets into separate classes when nesting exceeds 3-4 levels
- Use `MediaQuery.of(context).size` in `build()` without caching — it causes rebuilds; use `LayoutBuilder` instead
- Put business logic in widgets — keep it in providers, repositories, and service classes
- Use `StatefulWidget` when `StatelessWidget` + Riverpod suffices
- Skip `const` constructors — they are critical for performance; the linter will warn you
- Use `Colors.red` or `Color(0xFF...)` directly — define them in the theme and access via `colorScheme`
- Create god widgets with hundreds of lines — split into smaller focused widgets
- Use `ref.watch` in event handlers — use `ref.read` in callbacks, `ref.watch` only in `build()`
- Forget `dispose()` for controllers (TextEditingController, AnimationController, ScrollController)
- Use `print()` for logging — use the `logger` package or `debugPrint` for debug output
- Ignore platform differences — test on both iOS and Android; use adaptive widgets where appropriate
- Put everything in `lib/` root — use the `features/` and `core/` structure for organization
- Use `dynamic` types — Dart's type system is your friend; type everything
- Skip null checks — handle nullable values explicitly; never scatter `!` assertions without reason
- Rebuild entire screens — use `Consumer` or `ConsumerWidget` to scope rebuilds to what changed

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Feature-based folder structure (`lib/features/`, `lib/core/`)
- Riverpod for all state management with code generation
- GoRouter for navigation with auth redirect guards
- Material 3 theme with `ColorScheme.fromSeed` — never hardcode colors
- Repository pattern for data access
- `const` constructors on all widgets that allow it
- Named parameters for all widget constructors
- Dart 3 patterns, records, and null safety throughout
- Extract widgets early — no widget should exceed ~100 lines of `build()`
- Test providers and repositories independently

## Notes

[Any project-specific context]
