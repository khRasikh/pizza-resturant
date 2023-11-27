import { createPool } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = createPool({
      connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL as string,
    });

    const query = {
      text: "SELECT * FROM Customers",
    };

    const result = await pool.query(query);

    const customers = result.rows;
    return NextResponse.json({ data: customers });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json("Failed to fetch data");
  }
}
