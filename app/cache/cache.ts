export const getSSRCachedData = async () => {
  //   res.setHeader(
  //     "Cache-Control",
  //     "public, s-maxage=10, stale-while-revalidate=59"
  //   );
  const data = (
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      cache: "force-cache",
      next: { revalidate: 10 },
    })
  ).json();
  return data;
};
