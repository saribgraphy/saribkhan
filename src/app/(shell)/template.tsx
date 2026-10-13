/** Re-mounts per navigation: each view crossfades in with a 6px upward drift. */
export default function ShellTemplate({ children }: { children: React.ReactNode }) {
  return <div className="view-enter">{children}</div>;
}
