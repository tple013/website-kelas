import { NextResponse } from "next/server";
import { members } from "@/modules/members";

export async function GET() {
  return NextResponse.json(members);
}