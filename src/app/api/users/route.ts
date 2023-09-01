import { NextRequest, NextResponse } from "next/server";
import { createUser, getAllUsers } from "../../../../db/utilities";
import { User } from "@prisma/client";

export const GET = async (req: NextRequest) => {
  const res = await getAllUsers();
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};

export const POST = async (req: NextRequest) => {
  const body: User = await req.json();
  console.log(body);
  const res = await createUser(body);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};
