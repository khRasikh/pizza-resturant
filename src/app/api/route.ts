import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("test api router");
  return NextResponse.json({
    name: "welcome",
  });
}
