import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();

    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    // Assuming the incoming JSON data structure matches the columns in your customer table
    const { id, first_name, last_name, home_number, street_name, postal_code, phone_number, description } = data;

    if (!id || !first_name || !home_number || !street_name || !postal_code || !phone_number) {
      return NextResponse.json({ message: "Invalid data provided" }, { status: 400 });
    }

    const updateResult = await pool.query(
      "UPDATE customer SET first_name = $1, last_name = $2, home_number = $3, street_name = $4, postal_code = $5, phone_number = $6, description = $7 WHERE id = $8",
      [first_name, last_name, home_number, street_name, postal_code, phone_number, description, id]
    );

    if (updateResult.rowCount === 1) {
      // If the rowCount is 1 (indicating one row was updated), return a successful response with status code 200
      return NextResponse.json({ message: "Data updated successfully" }, { status: 200 });
    } else {
      // If the rowCount is not 1, it means the update didn't affect exactly one row; handle this as an error
      return NextResponse.json({ message: "Failed to update data" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ message: "Error updating data" }, { status: 500 });
  }
}
