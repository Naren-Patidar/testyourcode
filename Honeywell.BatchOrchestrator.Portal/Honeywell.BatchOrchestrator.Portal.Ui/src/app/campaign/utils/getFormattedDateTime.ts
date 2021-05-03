export const getFormattedDateTime = (inputDate: Date | null): string => {
  return `${inputDate?.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })}   |   ${inputDate?.toLocaleTimeString('en-US', {
    minute: '2-digit',
    hour: '2-digit',
  })}`;
};
