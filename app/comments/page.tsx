import AuthButton from "@/components/ui/auth-button";
import { Button } from "@/components/ui/button";
import CommentForm from "@/components/ui/comment-form";
import CommentList from "@/components/ui/comment-list";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CommentsPage() {
    const comments = await prisma.comment.findMany({
        include: { user: true },
        orderBy: {
            createdAt: "desc"
        },
    });
    return (
        <main className="min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Go back
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold mb-2">
                    Comments
                </h1>
                <p className="text-muted-foreground mb-8">Sign in with GitHub to leave a comment or message</p>
                <div>
                    <AuthButton />
                </div>
                <CommentForm />
                <div className="mt-12">
                    <h1 className="text-2xl font-semibold mb-4">
                        All comments ({comments.length})

                    </h1>
                    <CommentList comments={comments} />
                </div>
            </div>
        </main>
    )
}