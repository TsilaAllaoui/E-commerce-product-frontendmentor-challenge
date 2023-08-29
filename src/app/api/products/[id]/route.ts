import { NextRequest, NextResponse } from "next/server";
import { deleteProduct, getProduct } from "../../../../../db/utilities";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  return NextResponse.json(await getProduct(params.id));
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const res = await deleteProduct(params.id);
  return NextResponse.json({ status: 200 });
};
