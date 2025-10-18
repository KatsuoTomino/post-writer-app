"use client";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icon } from "./icon";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostCreateButtonProps extends ButtonProps {}

export default function PostCreateButton({
  className,
  variant,
  ...props
}: PostCreateButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    setIsLoading(true);

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Untitled Post",
      }),
    });
    setIsLoading(false);

    if (!response.ok) {
      toast(`エラーが発生しました: ${response.status}`);
      return;
    }

    const post = await response.json();

    router.refresh();
    router.push(`editor/${post.id}`);
  };
  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        { "cursor-not-allowed opacity-60": isLoading },
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.loader className="animate-spin mr-2 h-4 w-4" />
      ) : (
        <Icon.laptop className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
}
