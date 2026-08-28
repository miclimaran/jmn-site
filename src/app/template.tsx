/**
 * Route transition.
 *
 * `template.tsx` (rather than `layout.tsx`) remounts on every navigation, which
 * is what replays the entrance per page.
 *
 * Plain CSS, and a server component: putting framer-motion here would drag the
 * whole library into the shared bundle for every route. The keyframes live in
 * globals.css and are disabled under `prefers-reduced-motion`.
 *
 * Entrance only — Next's App Router does not keep the outgoing tree around for
 * an exit, and faking one delays every navigation by the length of the fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
