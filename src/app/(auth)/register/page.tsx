import UserAuthForm from "@/components/user-auth-form";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container flex flex-col justify-center h-screen items-center">
      <div className="mx-auto w-full sm:w-[350px] flex flex-col justify-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウント作成
          </h1>
          <p className="text-sm text-muted-foreground">
            新しいアカウントを作成してください。
          </p>
          <UserAuthForm />
          <p className="text-muted-foreground px-8 text-center text-sm">
            <Link href={"/login"} className="underline underline-offset-4">
              既にアカウントをお持ちですか？
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
