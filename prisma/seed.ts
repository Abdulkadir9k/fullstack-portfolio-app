// we run 'npx prisma db seed' when we modify this file and run 'npx prisma studio' to visualize the database table in prisma
import prisma from "@/lib/db"

async function main() {
    const blogPosts = [
        {
            id: "3",
            slug: "mastering-typescript",
            title: "Mastering TypeScript",
            content: "TypeScript adds strong typing to JavaScript, making large applications more reliable and easier to maintain.",
            createdAt: new Date("2024-06-15")
        },
        {

            id: "4",
            slug: "building-rest-apis",
            title: "Building REST APIs",
            content: "REST APIs provide a structured way for applications to communicate over HTTP, making backend development more modular and scalable.",
            createdAt: new Date("2024-06-20")
        }
    ]

    for (const post of blogPosts) {
        await prisma.blogPost.create({
            data: post
        })
    }
    console.log("Seed data has been inserted successfully!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })