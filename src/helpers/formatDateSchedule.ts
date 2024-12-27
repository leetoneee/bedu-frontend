export const formatDateSchedule = (isoString: string): string => {
  const date = new Date(isoString);

  // Extract date and time componentsF
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine into the desired format
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
