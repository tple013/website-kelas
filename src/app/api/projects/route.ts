import { NextResponse } from "next/server";
import { projects } from "@/modules/projects";

export async function GET() {
  return NextResponse.json(projects);
}