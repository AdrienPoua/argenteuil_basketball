'use client'

import { useState } from "react"
import Image from "next/image"
import { Ban, Mail, Phone, PhoneOff } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import Member from "@/models/Member"

type PropsType = {
  data: Readonly<ReturnType<Member['toPlainObject']>>
}

export default function Index({ data }: Readonly<PropsType>) {
    const [isNumberVisible, setIsNumberVisible] = useState(false)

  const handleEmailClick = () => {
    if (data.email) window.open(`mailto:${data.email}`)
  }

  const handlePhoneClick = () => {
    if (data.phone) {
      if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        window.open(`tel:${data.phone}`)
      } else {
        setIsNumberVisible((prev) => !prev)
      }
    }
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg bg-transparent ">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover object-top"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-2xl font-semibold text-center">{data.name}</h3>
        {data.role && <p className="text-center text-muted-foreground">{data.role}</p>}
        {data.teams.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {data.teams.map((team) => (
              <Badge key={team.id} variant="staffCard">
                {team.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-around p-4 bg-transparent">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEmailClick}
                disabled={!data.email}
              >
                {data.email ? <Mail className="h-5 w-5" /> : <Ban className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {data.email ? 'Envoyer un email' : 'Email not available'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={isNumberVisible ? undefined : "icon"}
                  onClick={handlePhoneClick}
                  disabled={!data.phone}
              >
                {data.phone ? (
                  isNumberVisible ? (
                    <span className="text-sm font-medium p-3">{data.phone}</span>
                  ) : (
                    <Phone className="h-5 w-5" />
                  )
                ) : (
                  <PhoneOff className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {data.phone
                ? isNumberVisible
                  ? 'Hide Number'
                  : 'Voir le numéro'
                : 'Phone not available'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}