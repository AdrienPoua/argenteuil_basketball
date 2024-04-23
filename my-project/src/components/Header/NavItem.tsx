import React from 'react'

export default function NavItem({ item }) {
  return (
    <li
    className='grow flex items-center justify-center  '
    key={item.title}
  >
    <a className='text-center px-7 py-6 font-bold' href={item.url}>
      {item.title}
    </a>
  </li>
  )
}
