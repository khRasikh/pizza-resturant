"use server"
import { createPool } from "@vercel/postgres";

export async function fetchMenu() {
  try {
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    const query = {
      text: "SELECT * FROM menu ORDER BY Id DESC",
    };

    const result = await pool.query(query);

    const menu = result.rows;
    return menu
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
