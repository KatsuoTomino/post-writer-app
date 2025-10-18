"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface TokenTestResult {
  success: boolean;
  message: string;
  session?: any;
  tokenInfo?: any;
  error?: string;
  timestamp?: string;
}

export default function TokenTestPage() {
  const { data: session, status } = useSession();
  const [tokenResult, setTokenResult] = useState<TokenTestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testToken = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/token-test");
      const result = await response.json();
      setTokenResult(result);
    } catch (error) {
      setTokenResult({
        success: false,
        message: "API呼び出しに失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testJWTToken = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/token-test", {
        method: "POST",
      });
      const result = await response.json();
      setTokenResult(result);
    } catch (error) {
      setTokenResult({
        success: false,
        message: "JWTトークンテストに失敗しました",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">セッション情報を読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">トークンテストページ</h1>

      {/* セッション状態表示 */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">現在のセッション状態</h2>

        {session ? (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 font-medium">✅ ログイン済み</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <strong>ユーザー名:</strong> {session.user?.name || "未設定"}
              </div>
              <div>
                <strong>メール:</strong> {session.user?.email || "未設定"}
              </div>
              <div>
                <strong>ユーザーID:</strong> {session.user?.id || "未設定"}
              </div>
              <div>
                <strong>有効期限:</strong>{" "}
                {session.expires
                  ? new Date(session.expires).toLocaleString()
                  : "未設定"}
              </div>
            </div>
            {session.user?.image && (
              <div>
                <strong>プロフィール画像:</strong>
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mt-2"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-red-800 font-medium">❌ ログインしていません</p>
            <p className="text-sm text-red-600 mt-1">
              ログインしてからトークンテストを実行してください。
            </p>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {session ? (
            <>
              <Button onClick={testToken} disabled={isLoading}>
                {isLoading ? "テスト中..." : "トークン取得テスト"}
              </Button>
              <Button
                onClick={testJWTToken}
                disabled={isLoading}
                variant="outline"
              >
                {isLoading ? "テスト中..." : "JWTトークンテスト"}
              </Button>
              <Button onClick={() => signOut()} variant="destructive">
                ログアウト
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => signIn("github")}>GitHubでログイン</Button>
              <Button onClick={() => signIn("google")} variant="outline">
                Googleでログイン
              </Button>
            </>
          )}
        </div>
      </div>

      {/* テスト結果表示 */}
      {tokenResult && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">テスト結果</h2>

          <div
            className={`p-4 rounded border ${
              tokenResult.success
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-center mb-2">
              {tokenResult.success ? (
                <span className="text-green-800 font-medium">✅ 成功</span>
              ) : (
                <span className="text-red-800 font-medium">❌ 失敗</span>
              )}
            </div>

            <p className="mb-3">{tokenResult.message}</p>

            {tokenResult.timestamp && (
              <p className="text-sm text-gray-600 mb-3">
                実行時刻: {new Date(tokenResult.timestamp).toLocaleString()}
              </p>
            )}

            {tokenResult.session && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">セッション情報:</h3>
                <pre className="bg-white p-3 rounded border text-sm overflow-auto">
                  {JSON.stringify(tokenResult.session, null, 2)}
                </pre>
              </div>
            )}

            {tokenResult.tokenInfo && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">トークン情報:</h3>
                <pre className="bg-white p-3 rounded border text-sm overflow-auto">
                  {JSON.stringify(tokenResult.tokenInfo, null, 2)}
                </pre>
              </div>
            )}

            {tokenResult.error && (
              <div className="mt-4">
                <h3 className="font-medium mb-2 text-red-800">エラー詳細:</h3>
                <p className="text-red-700 text-sm">{tokenResult.error}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
