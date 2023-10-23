import clientPromise from "@/components/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client: any = await clientPromise;
    const db = client.db("finance");

    const movies = await db.collection("tasks").find({}).sort({ metacritic: -1 }).limit(10).toArray();
    console.log(NextResponse.json(movies).status)
    return NextResponse.json(movies);
  } catch (e) {
    console.error(e);
  }
}
