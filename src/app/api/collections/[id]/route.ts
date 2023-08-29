import { NextRequest, NextResponse } from "next/server";
import { getProduct, getUserCollections } from "../../../../../db/utilities";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const res = await getUserCollections(params.id);
  if (res) {
    return NextResponse.json(res, { status: 200 });
  } else
    return NextResponse.json(
      { error: "Couldn't fetch products." },
      { status: 504 }
    );
};
