import { NextRequest, NextResponse } from "next/server";
import { getUser, updateUser } from "../../../../../db/utilities";
import { User } from "@prisma/client";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const res = await getUser(params.id);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  const res = await updateUser(body.id, body.data);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};
