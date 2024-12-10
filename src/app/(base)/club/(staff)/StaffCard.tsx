'use client'

import { useState } from "react"
import Image from "next/image"
import { Ban, Mail, Phone, PhoneOff } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

type StaffCardProps = {
  name: string
  img: string
  email: string
  number: string
  job?: string
  teams?: string[]
  isEmailDisplayed: boolean
  isNumberDisplayed: boolean
}

export default function StaffCard({
  name,
  img,
  email,
  number,
  job,
  teams = [],
  isEmailDisplayed,
  isNumberDisplayed,
}: Readonly<StaffCardProps>) {
  const [isNumberVisible, setIsNumberVisible] = useState(false)

  const handleEmailClick = () => {
    if (isEmailDisplayed) window.open(`mailto:${email}`)
  }

  const handlePhoneClick = () => {
    if (isNumberDisplayed) {
      if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        window.open(`tel:${number}`)
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
            src={img}
            alt={name}
            fill
            className="object-cover object-top"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-2xl font-semibold text-center">{name}</h3>
        {job && <p className="text-center text-muted-foreground">{job}</p>}
        {teams.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {teams.map((team) => (
              <Badge key={team} variant="staffCard">
                {team}
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
                disabled={!isEmailDisplayed}
              >
                {isEmailDisplayed ? <Mail className="h-5 w-5" /> : <Ban className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isEmailDisplayed ? 'Envoyer un email' : 'Email not available'}
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
                disabled={!isNumberDisplayed}
              >
                {isNumberDisplayed ? (
                  isNumberVisible ? (
                    <span className="text-sm font-medium p-3">{number}</span>
                  ) : (
                    <Phone className="h-5 w-5" />
                  )
                ) : (
                  <PhoneOff className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isNumberDisplayed
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