"use client"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useDispatch } from "react-redux"
import { hideSubBar, setCurrentNav } from "@/lib/redux/slices/navbar"
import DesktopNav from "@/components/Header/DesktopNav"
import MobileNav from "@/components/Header/MobileNav"

export default function Header() {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    dispatch(setCurrentNav(null))
  }, [pathname, dispatch])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        dispatch(hideSubBar())
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dispatch])

  return (
    <header 
      ref={headerRef}
      className="flex flex-col flex-wrap px-6 py-2 bg-foreground"
      id="back-to-top-anchor"
    >
      <DesktopNav />
      <MobileNav />
    </header>
  )
}