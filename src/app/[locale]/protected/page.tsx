"use client";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/shared/Search";
import { Table } from "@/components/protected/table";
import { createPool } from "@vercel/postgres";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Publishes() {
  const t = useTranslations("ProtectedPage");
  const [customers, setCustomer] = useState<any[]>([{}]);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const fetchData = async () => {
    const pool = createPool({
      connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
    });
    const data = await pool.sql`SELECT * FROM customers;`;
    setCustomer(data.rows);
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, []);

  //search & filter
  const [searchTerm, setsearchTerm] = useState("");
  const handleSearch = (value: string) => {
    setsearchTerm(value);
  };
  const filterCustomers = (customer: any): boolean => {
    if (!searchTerm) {
      return true; // No search term provided, return all customers
    }

    const searchTermLowerCase = searchTerm.toString().toLowerCase();

    const matchProperties = [
      'first_name',
      'last_name',
      'address',
      'phone_number',
      'id'
    ];

    for (const prop of matchProperties) {
      if (customer[prop]?.toString().toLowerCase().startsWith(searchTermLowerCase)) {
        return true; // Customer matches the search term in any property
      }
    }
    return false; // No match found in any customer property
  };

  const filteredCustumers = customers.filter(filterCustomers);

  return (
    <PageLayout title={t("title")}>
      <div className="justify-center items-center">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <ToastContainer />
            <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
            {filteredCustumers.length > 0 ? <Table data={filteredCustumers} isLoading={isLoading} itemsPerPage={10} /> :
              <div className="text-black my-2 py-2 justify-center items-center">
                <div className="whitespace-nowrap px-6 py-4">Loading ...</div>
              </div>}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}