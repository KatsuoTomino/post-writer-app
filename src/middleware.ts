import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // デバッグ情報を追加
    console.log(
      `[Middleware] Path: ${req.nextUrl.pathname}, Token: ${!!req.nextauth
        .token}`
    );

    // ログインページにアクセスしてトークンがある場合、dashboardにリダイレクト
    if (req.nextUrl.pathname === "/login" && req.nextauth.token) {
      console.log(`[Middleware] Redirecting to dashboard`);
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        console.log(
          `[Middleware] Authorized check - Path: ${
            req.nextUrl.pathname
          }, Has token: ${!!token}`
        );

        // ログインページの場合は常に許可（リダイレクト処理のため）
        if (req.nextUrl.pathname === "/login") {
          return true;
        }
        // その他の認証が必要なページはトークンの存在をチェック
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // 認証が必要なページとテスト用ページを指定
    "/dashboard/:path*",
    "/editor/:path*",
    "/admin/:path*",
    "/login", // ログインページも含めてリダイレクト処理のため
    "/token-test", // テストページも含める
  ],
};
