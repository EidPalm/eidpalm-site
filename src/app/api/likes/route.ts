// src/app/api/likes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getLikes, incrementLike, isKVConfigured } from "../../../lib/likes";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ids = (searchParams.get("ids") || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  const data = await getLikes(ids);
  if (searchParams.get("debug")) (data as any)._kv = isKVConfigured;
  return NextResponse.json(data, { headers: CORS });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json().catch(() => ({}));
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400, headers: CORS });
  }
  const n = await incrementLike(String(id));
  return NextResponse.json({ id, likes: n }, { headers: CORS });
}

export function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
