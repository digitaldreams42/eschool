import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await client.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("[auth/login]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
