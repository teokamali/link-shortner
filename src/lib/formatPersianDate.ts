export const formatPersianDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("fa-IR", {
    // year: "numeric",
    day: "2-digit",
    month: "long",
  }).format(date);
};
