export function getTimeDifference(
  from: string,
  to: string | null = null
): string {
  const now = to ? new Date(to) : new Date();
  const end = new Date(from);
  // console.log({ now, end });

  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return "00:00";

  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
}
