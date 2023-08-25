import { NextRequest, NextResponse } from "next/server";
import { createProduct } from "../../../../db/utilities";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const res = await createProduct(body);
  if (res) {
    return NextResponse.json(res);
  } else return NextResponse.error();
};
