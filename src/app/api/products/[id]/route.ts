import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "../../../../../db/utilities";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  //   const res = new NextResponse();
  //   res = await getProduct(params.id);
  return NextResponse.json(await getProduct(params.id));
};
