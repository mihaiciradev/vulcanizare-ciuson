export default function WheelFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label="Roată de camion Ciuson"
      className={className}
    >
      <circle cx="100" cy="100" r="98" fill="#111" />
      <circle cx="100" cy="100" r="78" fill="#2a2a2a" />
      <circle cx="100" cy="100" r="54" fill="#8c8c8c" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <rect
          key={angle}
          x="92"
          y="46"
          width="16"
          height="34"
          rx="5"
          fill="#d6d6d6"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="14" fill="#e80d13" />
      <circle cx="100" cy="100" r="5" fill="#000" />
    </svg>
  );
}
