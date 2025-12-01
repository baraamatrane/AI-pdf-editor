import { NextResponse } from "next/server";

async function POST(req: Request, res: Response) {
  try {
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
