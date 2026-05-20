type Direction = "up" | "down" | "neutral";

export function Sparkline({
  values,
  width = 60,
  height = 18,
  color = "#C9A84C",
  fill = true,
  direction,
}: {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  direction?: Direction;
}) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / range) * (height - 2) - 1;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  const dir =
    direction ??
    (values[values.length - 1] > values[0]
      ? "up"
      : values[values.length - 1] < values[0]
      ? "down"
      : "neutral");

  const strokeColor = color;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
      aria-hidden
      data-trend={dir}
    >
      {fill && (
        <polygon
          points={areaPoints}
          fill={strokeColor}
          opacity={0.12}
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
