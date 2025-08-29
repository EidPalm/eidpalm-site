import { NextRequest, NextResponse } from "next/server";
import { getLikes, incrementLike } from "../../../lib/likes";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { headers: cors });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idsParam = (searchParams.get("ids") || "").trim();
  const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
  const data = await getLikes(ids);
  return NextResponse.json(data, { headers: cors });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const id = body?.id as string | undefined;
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400, headers: cors });

  const count = await incrementLike(id);
  return NextResponse.json({ id, count }, { headers: cors });
}
