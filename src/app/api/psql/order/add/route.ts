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

    const ordersList = data; // Assuming the incoming JSON data is an array of orders

    if (!ordersList || !Array.isArray(ordersList) || ordersList.length === 0) {
      return NextResponse.json({ message: "Invalid or empty orders list" }, { status: 400 });
    }

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      for (const order of ordersList) {
        const { id, customer_id, count, price, extra, total } = order;
        // Add your logic here to validate or process each order before insertion
        await client.query(
          "INSERT INTO orders (user_id, customer_id, id, count, price, extra, total, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
          [1, customer_id, id, count, price, extra, total, false]
        );
      }

      await client.query("COMMIT");
      client.release();

      return NextResponse.json({ message: "Orders inserted successfully" }, { status: 200 });
    } catch (error) {
      await client.query("ROLLBACK");
      client.release();
      throw error;
    }
  } catch (error) {
    console.error("Error inserting orders:", error);
    return NextResponse.json({ message: "Failed to insert orders" }, { status: 500 });
  }
}
