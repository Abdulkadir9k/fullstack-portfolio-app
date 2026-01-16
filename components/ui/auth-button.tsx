"use client"

import { signIn, signOut, useSession } from "@/lib/auth-client"
import { Button } from "./button"
import { Github, Loader2, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

function AuthButton() {
    const { data: session, isPending } = useSession()
    if (isPending) {
        return (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading....
            </div>
        )
    }
    const signInBtn = async () => {
        await signIn.social({
            provider: "github",
        })
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                        <AvatarImage
                            src={session.user.image || ""}
                            alt={session.user.name || "User"}
                        />
                        <AvatarFallback>

                            {session.user.name?.[0] || "User"}

                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">
                        {session.user.name || session.user.email}

                    </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                </Button>
            </div>
        )
    }


    return (
        <Button onClick={signInBtn}>
            <Github className="w-4 h-4 mr-2" />
            sign in with GitHub
        </Button>
    )
}

export default AuthButton