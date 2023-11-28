import { createPool } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();

    const pool = createPool({
      connectionString: process.env.POSTGRES_URL as string,
    });

    const { Id } = data;

    await pool.query("DELETE FROM Customers WHERE Id = $1", [Id]);
    console.info(`A record with ID#${Id} has been deleted successfully!`);
    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json("Failed to delete data");
  }
}
