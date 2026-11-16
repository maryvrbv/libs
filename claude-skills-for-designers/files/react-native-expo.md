# [Project Name]

[Brief description — what does this app do?]

---

## Tech Stack

- React Native (Expo SDK 52+)
- TypeScript
- Expo Router (file-based routing)
- [NativeWind / StyleSheet — pick one]
- [Data: AsyncStorage / Expo SQLite / Supabase / etc.]

## Design System: React Native + Expo

This project uses React Native via Expo. Follow each platform's native conventions — iOS follows Apple HIG, Android follows Material Design. Expo handles platform differences. The app should feel native on both platforms, not like a web app in a wrapper.

### Navigation

Use Expo Router — file-based routing built on React Navigation.

**Patterns:**
- **Tab Bar:** `app/(tabs)/_layout.tsx` with `Tabs` component. Use 3-5 tabs.
- **Stack:** `app/_layout.tsx` with `Stack` component. For push/pop navigation.
- **Drawer:** `app/_layout.tsx` with `Drawer` component. For side navigation.
- **Modal:** Files in `app/modal/` or use `presentation: 'modal'` in screen options.

```tsx
// app/(tabs)/_layout.tsx
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <IconSymbol name="house.fill" color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => <IconSymbol name="paperplane.fill" color={color} /> }} />
    </Tabs>
  );
}
```

**Rules:**
- Always set `title` in screen options
- Use `headerLargeTitle: true` for top-level screens (iOS)
- Use `router.push()` for forward navigation, `router.back()` to go back
- Never hide the back button

### Core Components

Use React Native's built-in components. Do not install UI libraries unless you have a specific reason.

**Layout:**
- `View` — base container (like `<div>`)
- `ScrollView` — scrollable content (use for short lists or forms)
- `FlatList` — performant scrollable lists (always prefer over ScrollView for lists)
- `SectionList` — grouped lists with headers
- `SafeAreaView` — respects notch/home indicator (or use `useSafeAreaInsets()`)
- `KeyboardAvoidingView` — pushes content above keyboard

**Text & Images:**
- `Text` — all text must be inside `Text` (never raw strings in `View`)
- `Image` — local and remote images
- `Expo.Image` — better caching and performance for remote images

**Input:**
- `TextInput` — text entry. Always set `placeholder`, `autoCapitalize`, `keyboardType`.
- `Switch` — on/off toggle
- `Pressable` — custom touchable areas (preferred over `TouchableOpacity`)

**Feedback:**
- `ActivityIndicator` — loading spinner
- `Alert.alert()` — native alert dialogs
- `Modal` — fullscreen or slide-up modals

**Platform-specific:**
- `Platform.OS` — check `'ios'` or `'android'`
- `Platform.select({})` — return platform-specific values
- Use sparingly — most code should be cross-platform

### Expo SDK Modules

Prefer Expo modules over third-party packages:

- `expo-haptics` — tactile feedback
- `expo-image-picker` — camera/gallery access
- `expo-file-system` — local file read/write
- `expo-notifications` — push notifications
- `expo-secure-store` — encrypted key-value storage
- `expo-constants` — app info, device info
- `expo-linking` — deep links and URL handling
- `expo-splash-screen` — splash screen control
- `expo-font` — custom font loading
- `expo-linear-gradient` — gradient backgrounds
- `expo-blur` — blur effects
- `expo-camera` — camera access
- `expo-av` — audio/video playback
- `expo-location` — GPS location
- `expo-web-browser` — in-app browser
- `@react-native-async-storage/async-storage` — simple persistence

### Spacing & Layout

React Native uses flexbox (column direction by default). All values are density-independent pixels.

**Standard spacing scale (dp):**

| Token | Value | Use |
|-------|-------|-----|
| `4` | 4dp | Icon gaps, tight padding |
| `8` | 8dp | Inline spacing, input padding |
| `12` | 12dp | Compact section gaps |
| `16` | 16dp | Standard padding, list item padding |
| `20` | 20dp | Content gaps |
| `24` | 24dp | Section gaps |
| `32` | 32dp | Large section spacing |
| `48` | 48dp | Page-level spacing |

```tsx
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  section: { gap: 24 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  card: { padding: 16, borderRadius: 12, gap: 8 },
});
```

**Key layout rules:**
- Default `flexDirection` is `column` (not `row` like web)
- Use `gap` for spacing between children (RN 0.71+)
- Use `flex: 1` to fill available space
- Use `padding` not `margin` for outer spacing on containers
- Use `borderRadius: 12` for cards, `borderRadius: 8` for buttons, `borderRadius: 9999` for pills

### Color System

Define semantic colors that adapt to light/dark mode:

```tsx
// constants/Colors.ts
export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    textTertiary: '#889096',
    background: '#FFFFFF',
    surface: '#F6F6F6',
    border: '#E6E8EB',
    primary: '#0070F3',
    primaryForeground: '#FFFFFF',
    danger: '#E5484D',
    dangerForeground: '#FFFFFF',
    success: '#30A46C',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#0070F3',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    textTertiary: '#687076',
    background: '#151718',
    surface: '#1E2021',
    border: '#2B2F31',
    primary: '#3B82F6',
    primaryForeground: '#FFFFFF',
    danger: '#E5484D',
    dangerForeground: '#FFFFFF',
    success: '#30A46C',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#3B82F6',
  },
};
```

Use via a hook: `const colors = useColorScheme() === 'dark' ? Colors.dark : Colors.light;`

**Rules:**
- Never hardcode colors in components — always reference the Colors object
- Always support both light and dark mode
- Test both modes during development

### Typography

Define a type scale — keep it consistent:

```tsx
// constants/Typography.ts
export const Typography = {
  largeTitle: { fontSize: 34, fontWeight: '700' as const, lineHeight: 41 },
  title1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  title2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
  title3: { fontSize: 20, fontWeight: '600' as const, lineHeight: 25 },
  headline: { fontSize: 17, fontWeight: '600' as const, lineHeight: 22 },
  body: { fontSize: 17, fontWeight: '400' as const, lineHeight: 22 },
  callout: { fontSize: 16, fontWeight: '400' as const, lineHeight: 21 },
  subheadline: { fontSize: 15, fontWeight: '400' as const, lineHeight: 20 },
  footnote: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  caption1: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
  caption2: { fontSize: 11, fontWeight: '400' as const, lineHeight: 13 },
};
```

Usage: `<Text style={[Typography.headline, { color: colors.text }]}>Title</Text>`

### File Structure

```
app/
├── _layout.tsx              # Root layout (Stack)
├── index.tsx                # Home screen
├── (tabs)/
│   ├── _layout.tsx          # Tab layout
│   ├── index.tsx            # First tab
│   └── explore.tsx          # Second tab
├── [feature]/
│   ├── index.tsx            # Feature list/main
│   └── [id].tsx             # Feature detail
└── modal.tsx                # Modal screen

components/
├── ui/                      # Reusable UI (Button, Card, Input, etc.)
├── [Feature].tsx             # Feature components
└── ThemedText.tsx            # Text with theme colors

constants/
├── Colors.ts                # Light/dark color tokens
└── Typography.ts            # Type scale

hooks/
├── useColorScheme.ts        # Theme hook
└── use[Feature].ts          # Feature hooks

services/
└── [service].ts             # API, storage, etc.
```

### Naming Conventions

- **Screen files:** `kebab-case.tsx` in `app/` (Expo Router convention)
- **Components:** `PascalCase.tsx`
- **Hooks:** `use[Name].ts`
- **Constants:** `PascalCase.ts`
- **Services:** `camelCase.ts`

### Anti-Patterns — Do NOT

- Use `<div>`, `<span>`, `<img>` — this is not the web. Use `View`, `Text`, `Image`.
- Put raw text outside `<Text>` components
- Use `ScrollView` for long lists — use `FlatList`
- Install UI component libraries (NativeBase, React Native Elements, etc.) — build simple wrappers
- Use `TouchableOpacity` — use `Pressable` (more flexible)
- Use `Dimensions.get()` for responsive layout — use `flex`, `%`, and `useWindowDimensions()`
- Set fixed heights/widths on containers — use `flex: 1` and padding
- Ignore the keyboard — always handle `KeyboardAvoidingView` on forms
- Skip haptic feedback on important actions (toggle, delete, submit)
- Use `console.log` in production — use `__DEV__` checks
- Install packages without checking if Expo has a built-in module first

## Screens

1. **[Screen Name]** — [what it shows]
2. **[Screen Name]** — [purpose]
3. **Settings** — [what's configurable]

## Current State

[Where is the project? What's working, what's next?]

## Conventions

- Expo Router for all navigation (file-based)
- Prefer Expo SDK modules over third-party packages
- `StyleSheet.create()` for styles (colocated with component or extracted to shared styles)
- Keep components small — extract reusable pieces to `components/ui/`
- Use `async/await` for all async operations
- Test on both iOS and Android simulators

## Notes

[Any project-specific context]
