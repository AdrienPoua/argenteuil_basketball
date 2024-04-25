import Link from 'next/link'
import React from 'react'
import { NavItem } from '../../../types'

type ItemProps = {item : NavItem} 
export default function Index({ item } : Readonly<ItemProps> ) {
  return (
    <li
    className='grow flex items-center justify-center  '
    key={item.title}
  >
    <Link className='text-center px-7 py-6 font-bold' href={item.url ? item.url : "/"}>
      {item.title}
    </Link>
  </li>
  )
}
