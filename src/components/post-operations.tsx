"use client";

import { Post } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Icon } from "./icon";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostOperationProps {
  post: Pick<Post, "id" | "title">;
}

async function deletePost(postId: string) {
  try {
    const response = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    toast("正常に削除されました。");
    if (!response.ok) {
      throw new Error("failed");
    }

    return true;
  } catch (err) {
    toast("削除されませんでした。");
  }
}

export default function PostOperations({ post }: PostOperationProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon.ellipsis className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href={`/editor${post.id}`} className="w-full">
              編集
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive cursor-pointer focus-destructive"
            onClick={() => setShowDeleteAlert(true)}
          >
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>本当にこの記事を削除しますか？</AlertDialogTitle>
            <AlertDialogDescription>
              この操作は取り返しがききません。本当に大丈夫ですか？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async (e) => {
                e.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deletePost(post.id);

                if (deleted) {
                  setShowDeleteAlert(false);
                  setIsDeleteLoading(false);
                  router.refresh();
                }
              }}
              className=" bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icon.spinner className="animate-spin mr-2 w-4 h-2" />
              ) : (
                <Icon.laptop className="mr-2 w-4 h-2" />
              )}
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
