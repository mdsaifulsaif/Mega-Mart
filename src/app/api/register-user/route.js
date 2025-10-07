import { NextResponse } from "next/server";
import { ConnectDB } from "../../lib/config/db";
import userModel from "../../lib/models/User.model";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, role } = body;
  console.log(body);
  try {
    await ConnectDB();
    const findExistingUser = await userModel.findOne({ email: email });
    if (findExistingUser) {
      return NextResponse.json({ msg: "Already exist this email" });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    return NextResponse.json({
      registerUser: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
      },
      msg: "user created succfully",
    });
  } catch (error) {}

  return NextResponse.json({ msg: "user can't create " });
}
