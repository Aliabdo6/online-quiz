import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import clientPromise from "../../../../lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, password } =
      await request.json();
    await clientPromise;

    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = bcrypt.hashSync(
      password,
      10
    );
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}
