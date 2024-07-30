import React, { ReactElement } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/images/logo.png'

export default function Index(): ReactElement {
  return (
    <Link
      href="/"
      className="shrink-0">
      <Image
        src={logo}
        alt="logo"
        className="me-5"
        width="80"
        height="80"
      />
    </Link>
  )
}
