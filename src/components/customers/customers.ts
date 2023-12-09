"use server";

import { createPool } from "@vercel/postgres";

export async function getCustomers() {
  try {
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    const query = {
      text: "SELECT * FROM customer ORDER BY id DESC",
    };

    const result = await pool.query(query);

    const customers = result.rows;
    return customers;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
