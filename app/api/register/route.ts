"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
        return { error: "Email already in use." };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
    return NextResponse.json({ user })
  } catch (error) {
    return NextResponse.json("Internal Error")
  }
}
