import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Index(): ReactElement {
  return (
    <Link href="/" className="shrink-0">
      <Image src={'/images/logo.png'} alt="logo" className="me-5" width="80" height="80" />
    </Link>
  )
}
