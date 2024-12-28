export const buildQuery = (searchTerm: string) => {
  if (!searchTerm) return {};
  return {
    $or: [
      { shortId: { $regex: searchTerm, $options: "i" } },
      { longUrl: { $regex: searchTerm, $options: "i" } },
    ],
  };
};
