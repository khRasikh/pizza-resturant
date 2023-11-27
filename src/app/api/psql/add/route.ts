import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const pool = createPool({
      connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
    });

    // Assuming the incoming JSON data structure matches the columns in your Customers table
    const { Id, First_Name, Last_Name, Age, Phone_Number, Address, Birth_Date } = data;

    await pool.query(
      "INSERT INTO Customers (Id, First_Name, Last_Name, Age, Phone_Number, Address, Birth_Date) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [Id, First_Name, Last_Name, Age, Phone_Number, Address, Birth_Date]
    );

    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    return NextResponse.json("Failed to insert data");
  }
}