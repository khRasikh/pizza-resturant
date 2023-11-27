import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("test data", data)

    const pool = createPool({
      connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL,
    });

    const { Id, /* Add other fields to update */ } = data;

    // Assuming 'Customers' table has fields like Name, Email, etc.
    // Modify this query to update specific fields based on your table structure.
    await pool.query(
      "UPDATE Customers SET /* field1 = $1, field2 = $2, ... */ WHERE Id = $1",
      [/* newValue1, newValue2, ..., Id */]
    );

    console.info(`A record with ID#${Id} has been updated successfully!`);
    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json("Failed to update data");
  }
}
