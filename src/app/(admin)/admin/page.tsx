'use client'

import { useSession, signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Loader from "@/components/Loader"

export default function SignIn() {
  const { status } = useSession()

  // Affichage d'un état de chargement si la session est en cours de vérification
  if (status === "loading") {
    return (
      <Loader />
    )
  }

  if (status === "authenticated") {
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Button
        size="lg"
        className="overflow-hidden"
        onClick={async () => await signIn("github")}>
        Se connecter
      </Button>
    </div >
  )
}
