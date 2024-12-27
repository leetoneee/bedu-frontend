export const getFullDayName = (shortDay: string): string => {
  const dayMapping: Record<string, string> = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };

  return dayMapping[shortDay] || "Invalid Day";
};