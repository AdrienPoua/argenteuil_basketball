'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

type GymCardProps = {
  name: string
  adress: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
}

export default function GymCard({
  name,
  adress,
  city,
  coordinates,
}: Readonly<GymCardProps>): React.ReactElement {
  // Create Google Maps URL with the address
  const mapSrc = coordinates
    ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${coordinates.lat},${coordinates.lng}&zoom=15`
    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(adress + ' ' + city + ' ' + '95100')}&zoom=15`

  return (
    <Card className="relative mx-auto h-72 w-full max-w-screen-xl cursor-pointer overflow-hidden rounded-lg border-none shadow-lg lg:h-[600px]">
      {/* Map background instead of image */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Carte pour ${name}`}
        ></iframe>
      </div>

      {/* Card Content */}
      <CardContent className="absolute left-1/2 top-10 flex -translate-x-1/2 flex-col items-center justify-center text-white">
        <h2 className="w-full bg-black bg-opacity-60 p-2 text-center text-3xl lg:text-5xl">
          {name}
        </h2>
      </CardContent>
    </Card>
  )
}
