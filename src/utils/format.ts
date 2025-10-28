/** formats a number into hours, minutes, seconds */
export const formatVideoLength = (lengthInSeconds: number) => {
  const hours = Math.floor(lengthInSeconds / 3600);
  const minutes = Math.floor((lengthInSeconds % 3600) / 60);
  const seconds = lengthInSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  } else {
    return `${seconds}s`;
  }
}; 