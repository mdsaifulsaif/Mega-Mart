import { Asul } from "next/font/google";
import { ConnectDB } from "../../lib/config/db";
import categoryModel from "../../lib/models/Category.model";
const { NextResponse } = require("next/server");

export async function POST(request) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { name, image, slug, description } = body;

    // if (!name) {
    //   return NextResponse.json(
    //     { success: false, msg: "Title is required" },
    //     { status: 400 }
    //   );
    // }

    const newCat = await categoryModel.create({
      name,
      image,
      description,
      slug,
    });

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

export async function GET() {
  try {
    await ConnectDB();

    const categories = await categoryModel.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
