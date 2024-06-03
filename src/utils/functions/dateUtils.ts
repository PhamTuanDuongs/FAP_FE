export const formatDate = (inputDate: string) => {
  return new Date(Date.parse(inputDate)).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};
