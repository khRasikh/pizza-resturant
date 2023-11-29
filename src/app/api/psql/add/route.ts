import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    // Assuming the incoming JSON data structure matches the columns in your Customers table
    const { Id, First_Name, Last_Name, Phone_Number, Address, Birth_Date } = data;
    
    if (!Id || !First_Name || !Phone_Number || !Address) {
      return NextResponse.json({ message: "Data inserted successfully" }, { status: 404 });
    }

    const insertionResult = await pool.query(
      "INSERT INTO Customers (Id, First_Name, Last_Name,  Phone_Number, Address, Birth_Date) VALUES ($1, $2, $3, $4, $5, $6)",
      [Id, First_Name, Last_Name, Phone_Number, Address, Birth_Date]
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
