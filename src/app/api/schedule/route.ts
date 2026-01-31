import { NextResponse } from "next/server";
import { schedules } from "@/modules/schedule";

export async function GET() {
  return NextResponse.json(schedules);
}