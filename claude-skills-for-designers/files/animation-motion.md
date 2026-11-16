# [Project Name]

[Brief description of what this project does.]

---

## Capability: Animation & Motion Design

This project uses animation and motion to communicate state changes, guide attention, and make interactions feel responsive. Animation is a tool — use it with purpose, not decoration.

### Principles

- **Purposeful motion** — every animation should answer: what changed, and where should I look?
- **Fast by default** — most transitions should be 150-300ms. Users notice delays over 400ms.
- **Consistent physics** — pick a motion language (spring or easing) and apply it everywhere.
- **Respect user preferences** — always honor `prefers-reduced-motion`.

### Framer Motion (React)

Framer Motion is the primary animation library for React components.

**Basic animations with motion components:**
```tsx
import { motion } from "framer-motion";

// Animate on mount
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content appears here
</motion.div>

// Hover and tap interactions
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  Click me
</motion.button>
```

**AnimatePresence for enter/exit animations:**
```tsx
import { AnimatePresence, motion } from "framer-motion";

// Wrap elements that mount/unmount
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      key="modal"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Modal />
    </motion.div>
  )}
</AnimatePresence>
```

**Variants for orchestrated animations:**
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>
      {i.label}
    </motion.li>
  ))}
</motion.ul>
```

**Layout animations:**
```tsx
// Animate layout changes automatically
<motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
  {isExpanded ? <ExpandedCard /> : <CollapsedCard />}
</motion.div>

// Shared layout animations between components
<motion.div layoutId="card-highlight" className="active-indicator" />
```

**Page transitions (App Router or route changes):**
```tsx
// Wrap page content in AnimatePresence at the layout level
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

**Gesture-based interactions:**
```tsx
<motion.div
  drag="x"
  dragConstraints={{ left: -100, right: 100 }}
  dragElastic={0.2}
  onDragEnd={(event, info) => {
    if (info.offset.x > 80) handleSwipeRight();
    if (info.offset.x < -80) handleSwipeLeft();
  }}
>
  Swipeable card
</motion.div>
```

### CSS Transitions and Animations

Use CSS for simple state-based transitions. No library needed.

**Transitions for state changes:**
```css
.button {
  background-color: var(--color-primary);
  transform: scale(1);
  transition: background-color 150ms ease, transform 150ms ease;
}

.button:hover {
  background-color: var(--color-primary-hover);
  transform: scale(1.02);
}

.button:active {
  transform: scale(0.98);
}
```

**Keyframe animations:**
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: fade-in-up 300ms ease-out forwards;
}

/* Stagger with nth-child */
.card-enter:nth-child(1) { animation-delay: 0ms; }
.card-enter:nth-child(2) { animation-delay: 80ms; }
.card-enter:nth-child(3) { animation-delay: 160ms; }
```

**Loading spinner:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
```

### Spring Physics vs Easing Curves

**Springs** feel natural for interactive elements (dragging, toggling, layout shifts). They don't have a fixed duration — they settle based on stiffness and damping.

```tsx
// Snappy interaction spring
transition={{ type: "spring", stiffness: 400, damping: 25 }}

// Gentle entrance spring
transition={{ type: "spring", stiffness: 200, damping: 20 }}

// Bouncy spring (use sparingly)
transition={{ type: "spring", stiffness: 300, damping: 15 }}
```

**Easing curves** work best for timed animations (CSS transitions, page transitions, loading sequences).

```css
/* Enter: start fast, decelerate */
transition: transform 200ms ease-out;

/* Exit: start slow, accelerate */
transition: opacity 150ms ease-in;

/* Move: accelerate then decelerate */
transition: transform 250ms ease-in-out;

/* Custom cubic-bezier for snappy feel */
transition: transform 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Scroll-Triggered Animations

**Intersection Observer pattern:**
```tsx
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Usage
function Section() {
  const { ref, isVisible } = useFadeInOnScroll();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    />
  );
}
```

**Framer Motion `whileInView`:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4 }}
>
  Animates when scrolled into view
</motion.div>
```

### Micro-Interactions

**Button hover and press:**
```tsx
<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
  Save
</motion.button>
```

**Toggle switch:**
```tsx
<motion.div
  className="toggle-knob"
  animate={{ x: isOn ? 22 : 0 }}
  transition={{ type: "spring", stiffness: 500, damping: 30 }}
/>
```

**Success checkmark:**
```css
@keyframes draw-check {
  from { stroke-dashoffset: 24; }
  to { stroke-dashoffset: 0; }
}

.check-icon path {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: draw-check 400ms ease-out 200ms forwards;
}
```

**Skeleton loading pulse:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.skeleton {
  background: var(--color-muted);
  border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Reduced Motion

Always provide a reduced-motion alternative. This is not optional.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**In Framer Motion:**
```tsx
import { useReducedMotion } from "framer-motion";

function AnimatedCard() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={shouldReduce ? { duration: 0 } : { duration: 0.3 }}
    />
  );
}
```

### Performance

**GPU-accelerated properties (cheap to animate):**
- `transform` (translate, scale, rotate)
- `opacity`

**Expensive to animate (trigger layout/paint):**
- `width`, `height`, `top`, `left`, `margin`, `padding`
- `border-radius` (on large elements)
- `box-shadow` (paint-heavy)

**Rules:**
- Always animate `transform` and `opacity` instead of layout properties.
- Use `will-change: transform` sparingly — only on elements actively animating.
- Remove `will-change` after animation completes to free GPU memory.
- Avoid animating more than 2-3 elements simultaneously.
- Test on low-powered devices — not just your dev machine.

### When to Animate

| Animate | Don't Animate |
|---------|---------------|
| State changes (open → closed, loading → loaded) | Static content that doesn't change |
| Element entering or leaving the DOM | Every scroll event |
| Focus and hover feedback | Background decorations that loop forever |
| Navigation transitions | Text content |
| Success/error/completion states | Large images or complex SVGs |

### Timing Reference

| Context | Duration | Easing |
|---------|----------|--------|
| Button hover/active | 100-150ms | ease |
| Tooltip appear | 150ms | ease-out |
| Modal open | 200-250ms | ease-out |
| Modal close | 150-200ms | ease-in |
| Page transition | 200-300ms | ease-in-out |
| Stagger delay | 50-100ms | — |
| Scroll-triggered | 300-500ms | ease-out |

### Anti-Patterns — Do NOT

- Animate everything — motion should be meaningful, not constant
- Use long animations (>500ms for UI transitions) — they feel sluggish
- Animate layout properties (`width`, `height`, `top`, `left`) — use `transform` instead
- Ignore `prefers-reduced-motion` — this is an accessibility requirement
- Add entrance animations to content above the fold — it delays perceived load time
- Use bounce/elastic easing on everything — reserve it for playful, deliberate moments
- Animate on scroll without `once: true` — elements shouldn't re-animate when scrolled back
- Stack multiple animations on the same element with different timings — pick one motion
- Use `animation-delay` without `animation-fill-mode: backwards` — content flashes before animating
- Add loading spinners that spin forever — use skeleton screens instead for content loading

## Current State

[Where is the project? What's working, what's next?]

## Conventions

[Project-specific animation conventions.]

## Notes

[Any project-specific context.]
