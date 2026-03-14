import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = {
    village: "Sample Village",
    population: 1234,
    state: "Sample State",
  };
  return NextResponse.json(data);
}
