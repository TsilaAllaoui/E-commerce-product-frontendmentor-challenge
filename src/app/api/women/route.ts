import { NextRequest, NextResponse } from "next/server";
import { getAllProductsOfType } from "../../../../db/utilities";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  console.log(body);
  const res = await getAllProductsOfType(body.type);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json({ error: "No product found." }, { status: 504 });
};
