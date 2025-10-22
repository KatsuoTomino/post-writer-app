import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 10000, // 10秒に延長
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // async jwt({ token, user, account, profile }) {
    //   // JWTトークンにプロバイダーの情報を保存
    //   if (account && profile && user) {
    //     token.id = (profile as any).id || user.id;
    //     token.accessToken = account.access_token;
    //     token.refreshToken = account.refresh_token;
    //   }
    //   return token;
    // },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        // アクセストークンをセッションに追加（必要に応じて）
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  // セッションの有効期限を設定（デフォルト: 30日）
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // JWTの設定
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // デバッグモード（開発時のみ）
  debug: true, // デバッグログを有効化
};
