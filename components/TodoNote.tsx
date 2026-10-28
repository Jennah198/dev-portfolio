import { isTodo } from "@/lib/data";

export const showTodos = process.env.NODE_ENV !== "production";

/**
 * Renders a `TODO(nezira): …` placeholder as a visible note during development
 * and nothing in production, so unfinished copy can't ship by accident.
 */
export function TodoNote({ text, className = "" }: { text: string; className?: string }) {
  if (!showTodos) return null;
  return (
    <span
      className={`inline-block rounded-md border border-dashed border-lilac bg-lilac-soft px-2 py-1 font-mono text-xs text-lilac-text ${className}`}
    >
      {text}
    </span>
  );
}

/** Text when known, the dev-only TODO note otherwise. */
export function Fact({ value, className }: { value: string; className?: string }) {
  return isTodo(value) ? <TodoNote text={value} className={className} /> : <span className={className}>{value}</span>;
}
