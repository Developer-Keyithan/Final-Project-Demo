import { NextRequest, NextResponse } from "next/server";
import User from "../../../../lib/Models/User";
import DBconnect from "../../../../lib/db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SECRET_KEY;

const generateToken = (user: { _id: string; email: string; userType: string }) => {
  return jwt.sign({ id: user._id, email: user.email, userType: user.userType }, JWT_SECRET!, { expiresIn: 15552000 });
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { emailOrMobileNumber, password } = body;

    if (!emailOrMobileNumber || !password) {
      return NextResponse.json({ error: "Email or password is required" }, { status: 400 });
    }

    const isMobileNumber = /^\d+$/.test(emailOrMobileNumber);
    const query = isMobileNumber
      ? { mobileNumber: emailOrMobileNumber }
      : { email: emailOrMobileNumber };

    await DBconnect();
    const user = await User.findOne(query);

    if (!user) {
      return NextResponse.json({ error: "User not found. Please sign up." }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken(user);

    const response = NextResponse.json({
      message: "Login successful!",
      user: { id: user._id, email: user.email },
    }, { status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15552000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
