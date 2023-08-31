import { NextRequest, NextResponse } from "next/server";
import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../../../db/utilities";

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

export const PATCH = async (req: NextRequest) => {
  const json = await req.json();
  const res = await updateProduct(json.id, json.product);
  return NextResponse.json({ status: 200 });
};
