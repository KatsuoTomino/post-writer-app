import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // セッション情報を取得
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "セッションが見つかりません。ログインしてください。",
        session: null,
      });
    }

    // セッション情報を返す（機密情報は除く）
    return NextResponse.json({
      success: true,
      message: "トークンが正常に取得できました",
      session: {
        user: {
          id: session.user?.id,
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
        },
        expires: session.expires,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Token test error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "トークン取得中にエラーが発生しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  // JWTトークンの詳細情報を取得するためのエンドポイント
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "セッションが見つかりません",
      });
    }

    return NextResponse.json({
      success: true,
      message: "JWTトークン情報",
      tokenInfo: {
        hasSession: !!session,
        userExists: !!session.user,
        sessionExpires: session.expires,
        userFields: {
          hasId: !!session.user?.id,
          hasName: !!session.user?.name,
          hasEmail: !!session.user?.email,
          hasImage: !!session.user?.image,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "JWTトークン情報の取得に失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
