---
title: "Getting Started with React Hooks"
slug: "getting-started"
date: "2026-03-15"
excerpt: "A comprehensive guide to modern React patterns using hooks for state management, side effects, and custom abstractions."
author: "CapyCMS Team"
tags: ["react", "hooks", "tutorial"]
coverImage: "/images/demo-cover.jpg"
---

# Getting Started with React Hooks

React Hooks revolutionized the way we write components. In this guide, we'll explore the most important hooks and how to use them effectively.

## Why Hooks?

Before hooks, stateful logic required class components. Hooks let you use state and other React features **without writing a class**.

> "Hooks allow you to reuse stateful logic without changing your component hierarchy." — React Documentation

## The Essential Hooks

### useState

The most fundamental hook for adding state to functional components:

```tsx
const [count, setCount] = useState(0);
```

### useEffect

For side effects like data fetching, subscriptions, or DOM mutations:

```tsx
useEffect(() => {
  document.title = `You clicked ${count} times`;
  return () => {
    // Cleanup
  };
}, [count]);
```

### useContext

Access context values without nesting consumers:

```tsx
const theme = useContext(ThemeContext);
```

## Quick Reference

| Hook | Purpose | Returns |
|------|---------|---------|
| `useState` | Local state | `[value, setter]` |
| `useEffect` | Side effects | `void` |
| `useContext` | Context access | Context value |
| `useRef` | Mutable ref | `{ current }` |
| `useMemo` | Memoized value | Computed value |
| `useCallback` | Memoized fn | Callback |

## Custom Hooks

Create reusable logic by extracting hooks:

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStored(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue] as const;
}
```

## Rules of Hooks

1. Only call hooks **at the top level** — not inside loops, conditions, or nested functions
2. Only call hooks **from React functions** — components or custom hooks

---

Hooks make React code cleaner and more reusable. Start with `useState` and `useEffect`, then explore custom hooks as your app grows.
