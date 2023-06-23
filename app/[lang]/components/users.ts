"use server";
export async function getUsers() {
  const fdata = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // cache: "force-cache",
    // next: {
    //   revalidate: 60,
    // },
  });

  const data = await fdata.json();
  return data;
}
