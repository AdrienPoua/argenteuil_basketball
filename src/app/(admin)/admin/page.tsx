'use client'

import { useSession, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Loader from "@/components/Loader"

export default function SignIn() {
  const { data: session, status } = useSession()

  // Affichage d'un état de chargement si la session est en cours de vérification
  if (status === "loading") {
    return (
      <Loader />
    )
  }

  if(status === "authenticated"){
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-sm m-0 p-0">
        <CardContent className="m-0 p-0">
          <Button
            size="lg"
            className="w-full"
            onClick={async () => await signIn("github")}>
            Se connecter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
