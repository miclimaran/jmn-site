/**
 * Route wrapper.
 *
 * This used to replay a fade-and-rise on every navigation. It was removed: the
 * site is a parts catalog, and someone who clicks a part number should find the
 * number already on screen, not arriving. Animation is kept for interaction
 * only — hover, open/close.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
