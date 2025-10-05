import { Asul } from "next/font/google";
import { ConnectDB } from "../../lib/config/db";
import categoryModel from "../../lib/models/Category.model";
const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { name, image } = body;

    // if (!name) {
    //   return NextResponse.json(
    //     { success: false, msg: "Title is required" },
    //     { status: 400 }
    //   );
    // }

    const newCat = await categoryModel.create({ name, image });

    return NextResponse.json(
      { success: true, msg: "Category added", data: newCat },
      { status: 201 }
    );
  } catch (error) {
    console.error(" Error in post api category:", error);
    return NextResponse.json(
      { success: false, msg: "Server error", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  console.log("category get api");
  const categories = await categoryModel.find({});

  return NextResponse.json({ success: true, msg: "api working", categories });
}
