import { ReactElement } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type PropsType = {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  } | undefined
}

export default function User({ user }: Readonly<PropsType>): ReactElement {
  const { name, email, image } = user ?? {}

  return (
    <div className="flex space-x-4">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={image ?? "/images/default/avatar.webp"}
          alt={name ?? "User Avatar"}
        />
        <AvatarFallback>{name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-center space-y-1">
        <p className="text-lg font-semibold">{name ?? "Utilisateur"}</p>
        <p className="text-muted-foreground text-sm">{email ?? "Email non fourni"}</p>
      </div>
    </div>
  )
}
