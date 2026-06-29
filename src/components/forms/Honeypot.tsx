export function Honeypot() {
  return (
    <input
      type="text"
      name="_gotcha"
      tabIndex={-1}
      aria-hidden="true"
      autoComplete="off"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
