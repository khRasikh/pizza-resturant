import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    const { id = "" } = params;

    const query = {
      text: "SELECT * FROM customer WHERE id = $1", // Filter by 'id'
      values: [id], // Provide 'id' as a parameter to prevent SQL injection
    };

    const result = await pool.query(query);

    const customer = result.rows[0]; // Assuming there is only one customer with the provided 'id'

    if (customer) {
      return NextResponse.json({ data: customer });
    } else {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
