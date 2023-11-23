"use client";
import { createPool } from "@vercel/postgres";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Publishes() {
  const t = useTranslations("ProtectedPage");
  const [customers, setPost] = useState<any[]>([{}]);

  const fetchData = async () => {
    const pool = createPool({
      connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
    });
    const data = await pool.sql`SELECT * FROM customers;`;
    console.log("test data", data.rows);
    setPost(data.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageLayout title={t("title")}>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {customers.length > 0
            ? customers.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{`${post.first_name} ${post.last_name}`}</td>
                  <td>{post.age}</td>
                  <td>{post.address}</td>
                  <td>{post.phone_number}</td>
                </tr>
              ))
            : "Loading ...."}
        </tbody>
        {customers.length === 0 && <p>No posts available.</p>}
      </div>

      <div></div>
    </PageLayout>
  );
}
