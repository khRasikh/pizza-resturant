"use server";

import { createPool } from "@vercel/postgres";

const pool = createPool({
  connectionString: process.env.POSTGRES_URL as string,
});

export async function getData(tableName: string) {
  try {
    const query = {
      text: `SELECT * FROM ${tableName} ORDER BY id DESC`,
    };

    const result = await pool.query(query);

    const getResult = result.rows;
    return { status: true, body: getResult, message: "OK" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, body: [], message: "Internal Server Error" };
  }
}
export async function getDataByID(tableName: string, id: number) {
  try {
    const query = {
      text: `SELECT * FROM ${tableName} WHERE customer_id = '${id}'`,
    };

    const result = await pool.query(query);

    const getResult = result.rows;
    return { status: true, body: getResult, message: "OK" };
  } catch (err) {
    console.error("Error deleting data:", err);
    return { status: false, body: [], message: "Internal Server Error" };
  }
}
