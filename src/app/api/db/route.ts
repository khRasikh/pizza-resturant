import { NextResponse } from "next/server";
import clientPromise from "../../../components/lib/mongodb";

export async function GET() {
  try {
    const client: any = await clientPromise;
    const db = client.db("finance");

    const movies = await db.collection("tasks").find({}).sort({ metacritic: -1 }).limit(10).toArray();

    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
  }
}
