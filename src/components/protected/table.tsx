"use client"
import { createPool } from '@vercel/postgres';
import { useEffect, useState, type FC } from 'react';

interface tableProps { }
export const Table: FC<tableProps> = () => {
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
    return (
        <div>
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
                        {customers.length > 0
                            && customers.map((i) => (
                                <tr key={i.id}
                                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-600">
                                    <td className="whitespace-nowrap px-6 py-4" >{i.id}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.first_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.last_name} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.phone_number} </td>
                                    <td className="whitespace-nowrap px-6 py-4">{i.address} </td>
                                </tr>

                            )
                            )
                        }
                        {isLoading && <tr className="text-black my-12 py-16 justify-center items-center">
                            <td className="whitespace-nowrap px-6 py-4">Loading ...</td>
                        </tr>}
                    </tbody>
                </table>
                {customers.length === 0 && <p>No posts available.</p>}
            </div>
        </div>
    );
}