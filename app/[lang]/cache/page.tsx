import { getSSRCachedData } from "./session/cache";

export default async function FetchData() {
  const data = await getSSRCachedData();

  return (
    <main>
      <h1>SSR Caching with Next.js</h1>
      {data &&
        data.map((i: any) => {
          return (
            <ul key={i.userId}>
              <li >{i.id}</li>
              <li >{i.title}</li>
            </ul>
          );
        })}
    </main>
  );
}
