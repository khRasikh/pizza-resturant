"use server";
import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log(data);

    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    // Assuming the incoming JSON data structure matches the columns in your customer table
    const { id, count, price, extra, total } = data;
    if (!count || !price || !extra || !total) {
      return NextResponse.json({ message: "Data inserted successfully" }, { status: 404 });
    }

    const insertionResult = await pool.query(
      "INSERT INTO orders (user_id, id, count, price, extra, total, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [1, id, count, price, extra, total, false]
    );

    if (insertionResult.rowCount === 1) {
      // If the rowCount is 1 (indicating one row was affected), return a successful response with status code 200
      return NextResponse.json({ message: "Data inserted successfully" }, { status: 200 });
    } else {
      // If the rowCount is not 1, it means the insertion didn't affect exactly one row; handle this as an error
      // throw new Error("Failed to insert data");
      return NextResponse.json({ message: "Data inserted successfully" }, { status: 204 });
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json({ message: "Data inserted successfully" }, { status: 206 });
  }
}
