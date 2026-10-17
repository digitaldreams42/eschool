import { NextRequest, NextResponse } from "next/server";
import { client } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    const error = req.nextUrl.searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(`/sign-in?error=${encodeURIComponent(error)}`, req.url),
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL("/sign-in?error=missing_code", req.url),
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
      return NextResponse.redirect(
        new URL("/sign-in?error=oauth_not_configured", req.url),
      );
    }

    // Exchange code for tokens
    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const text = await tokenRes.text();
      console.error("[google/callback] token exchange failed:", text);
      return NextResponse.redirect(
        new URL("/sign-in?error=token_exchange_failed", req.url),
      );
    }

    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token as string;

    // Fetch user info
    const userRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      console.error("[google/callback] userinfo failed:", await userRes.text());
      return NextResponse.redirect(
        new URL("/sign-in?error=userinfo_failed", req.url),
      );
    }

    const googleUser = await userRes.json();
    const { email, given_name, family_name, picture, id: googleId } = googleUser as {
      email: string;
      given_name?: string;
      family_name?: string;
      picture?: string;
      id: string;
    };

    // Find or create user
    let user = await client.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (user) {
      // Update googleId if not set
      if (!user.googleId) {
        user = await client.user.update({
          where: { id: user.id },
          data: { googleId },
        });
      }
    } else {
      // Check if a user with this googleId exists (different email)
      const existingByGoogle = await client.user.findUnique({
        where: { googleId },
      });

      if (existingByGoogle) {
        user = existingByGoogle;
      } else {
        // Create new user
        user = await client.user.create({
          data: {
            email: email.toLowerCase().trim(),
            firstname: given_name || email.split("@")[0],
            lastname: family_name || "",
            image: picture || null,
            googleId,
          },
        });
      }
    }

    await createSession(user.id);

    // Redirect to home or callback
    return NextResponse.redirect(new URL("/callback/sign-in", req.url));
  } catch (error) {
    console.error("[google/callback]", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=internal_error", req.url),
    );
  }
}
