"use client"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const router = useRouter();
  
  return (
    <div className={"flex flex-col gap-6"}>
      <Button variant="outline" size="lg" className="w-full" onClick={() => signIn("github")}>
        Se connecter
      </Button>
      <Button size="lg" className="w-full" onClick={() => router.push("/")}>
        Revenir à l&apos;accueil
      </Button>
    </div>
  )
}
