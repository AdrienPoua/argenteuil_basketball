export const formatTime = (horaire: number): string => {
  const hours = Math.floor(horaire / 100);
  const minutes = horaire % 100;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};
