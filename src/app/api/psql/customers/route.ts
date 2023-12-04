import { createPool } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    const query = {
      text: "SELECT * FROM customer ORDER BY id DESC",
    };

    const result = await pool.query(query);

    const customers = result.rows;
    return NextResponse.json({
      data: customers,
      headers: {
        "Cache-Control": "public, s-maxage=1",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json("Failed to fetch data");
  }
}
