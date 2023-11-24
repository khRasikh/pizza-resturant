"use client";
import { createPool } from "@vercel/postgres";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { FC } from 'react';
import { useSession } from "next-auth/react";

export interface ITable {
  Customers: any[]
}

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
      <Table Customers={customers} />
    </PageLayout>
  );
}


export const Table: FC<ITable> = (data) => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead
                  className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600 rounded-md">
                  <tr>
                    <th scope="col" className="px-6 py-4">ID#</th>
                    <th scope="col" className="px-6 py-4">Name</th>
                    <th scope="col" className="px-6 py-4">Last Name</th>
                    <th scope="col" className="px-6 py-4">Phone Number</th>
                    <th scope="col" className="px-6 py-4">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {data.Customers.length > 0
                    ? data.Customers.map((i) => (
                      <tr key={i.id}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-600">
                        <td className="whitespace-nowrap px-6 py-4" >{i.id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{i.first_name} </td>
                        <td className="whitespace-nowrap px-6 py-4">{i.last_name} </td>
                        <td className="whitespace-nowrap px-6 py-4">{i.phone_number} </td>
                        <td className="whitespace-nowrap px-6 py-4">{i.address} </td>
                      </tr>

                    )
                    ) : <tr className="text-black my-12 py-16">Loading ...</tr>
                  }
                </tbody>
              </table>
              {data.Customers.length === 0 && <p>No posts available.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


