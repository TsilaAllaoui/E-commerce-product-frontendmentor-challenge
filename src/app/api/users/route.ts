import { NextRequest, NextResponse } from "next/server";
import { getAllUsers } from "../../../../db/utilities";

export const GET = async (req: NextRequest) => {
  const res = await getAllUsers();
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};
