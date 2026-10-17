import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstname, lastname, email, password } = body as {
      firstname?: string;
      lastname?: string;
      email?: string;
      password?: string;
    };

    if (!firstname || !lastname || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existing = await client.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await client.user.create({
      data: {
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        image: true,
      },
    });

    await createSession(user.id);

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("[auth/signup]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
