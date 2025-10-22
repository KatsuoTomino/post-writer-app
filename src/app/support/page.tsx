import { Metadata } from "next";

export const metadata: Metadata = {
  title: "サポート",
  description: "Post Writer のサポートページです。",
};

export default function SupportPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">サポート</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">よくある質問</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Q: ログインできない場合は？</h3>
              <p className="text-muted-foreground">
                GitHubアカウントでログインしてください。問題が続く場合は、ブラウザのキャッシュをクリアしてください。
              </p>
            </div>
            <div>
              <h3 className="font-medium">Q: 記事の保存方法は？</h3>
              <p className="text-muted-foreground">
                エディターで記事を編集後、「保存」ボタンをクリックしてください。自動保存機能も搭載しています。
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">お問い合わせ</h2>
          <p className="text-muted-foreground">
            技術的な問題やご質問がございましたら、以下の方法でお問い合わせください。
          </p>
          <div className="mt-4">
            <p>📧 Email: support@example.com</p>
            <p>🐦 Twitter: @TomikawaSan</p>
          </div>
        </section>
      </div>
    </div>
  );
}
