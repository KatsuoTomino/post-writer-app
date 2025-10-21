import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // データベース接続をテスト
    await db.$connect();

    // 簡単なクエリを実行
    const userCount = await db.user.count();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      userCount,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
