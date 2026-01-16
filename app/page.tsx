import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";

export default async function Home() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc"
    },
    take: 3
  });

  return (
    <main className="min-h-screen">
      {/*Hero-Section*/}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Abdulkadir</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-6">
          A passionate developer specializing in building exceptional digital experiences.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/blog">Read blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/comments">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Me
            </Link>

          </Button>
        </div>
      </section>

      {/*About-Section*/}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">About me</h2>
        <p>
          I am a software developer with a strong background in building web applications.
          I enjoy learning new technologies and improving my skills to create better user experiences.
          In my free time, I like to write blog posts about my development journey and share insights with the community.
        </p>
      </section>

      {/*Recent-Posts*/}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4">{posts.map((post: any) => (
            <Card key={post.id} className="hover:bg-accent transition-color">
              <Link href={`/blog/${post.slug}`}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</p>
                </CardContent>
              </Link>

            </Card>
          ))}</div>
        ) : (<p className="text-muted-foreground">no posts yet</p>)}
        <Button variant="link" className="mt-4 px-0">
          <Link href="/blog">View all posts <ArrowRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </section>
    </main>
  );
}
