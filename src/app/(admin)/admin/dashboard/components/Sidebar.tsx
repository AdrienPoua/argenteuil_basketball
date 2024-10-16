'use client'

import { useState, ReactElement } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    MenuIcon,
    XIcon,
    LayoutDashboard,
    Mail,
    Trophy,
    Users,
    Calendar,
    Theater,
    UserCog,
    GraduationCap,
    UsersRound,
    HelpCircle,
    Camera,
    Home,
    LogOut
} from 'lucide-react'
import { signOut } from "next-auth/react"

const data = [
    {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        title: "Matchs",
        href: "/admin/dashboard/matchs",
        icon: <Trophy />,
    },
    {
        title: "Members",
        href: "/admin/dashboard/members",
        icon: <Users />,
    },
    {
        title: "Convocations",
        href: "/admin/dashboard/convocations",
        icon: <Calendar />,
    },
    {
        title: "Derogations",
        href: "/admin/dashboard/derogations",
        icon: <Theater />,
    },
    {
        title: "Correspondants",
        href: "/admin/dashboard/correspondants",
        icon: <UserCog />,
    },
    {
        title: "Staffs",
        href: "/admin/dashboard/staffs",
        icon: <GraduationCap />,
    },
    {
        title: "Equipes",
        href: "/admin/dashboard/equipes",
        icon: <UsersRound />,
    },
    {
        title: "FAQ",
        href: "/admin/dashboard/faq",
        icon: <HelpCircle />,
    }
]

export default function Component() {
    return (
        <div className="relative">
            <DesktopSidebar />
            <MobileSidebar />
        </div>
    )
}

const DesktopSidebar = () => {
    return (
        <aside className="h-screen sticky top-0 bot-0 z-50 hidden w-64 bg-primary text-primary-foreground lg:block py-10">
            <NavBar />
        </aside>
    )
}

const MobileSidebar = () => {
    const [open, setOpen] = useState(false)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="destructive" size="icon" className="lg:hidden absolute top-10 left-10">
                    <MenuIcon className="h-12 aspect-square" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-primary p-0">
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-lg font-semibold text-primary-foreground">Menu</span>
                        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                            <XIcon className="h-6 w-6 text-primary-foreground" />
                        </Button>
                    </div>
                    <NavBar />
                </div>
            </SheetContent>
        </Sheet>
    )
}

const NavBar = () => {
    const pathname = usePathname()
    return (
        <nav className="space-y-2 px-2 flex flex-col justify-between h-full">
            <div className="flex gap-3 flex-col">
                {data.map((item) => (
                    <CustomLink
                        key={item.title}
                        pathname={pathname}
                        {...item}
                    />
                ))}
            </div>
            <BottomLinks pathname={pathname} />
        </nav>
    )
}




type CustomLinkProps = {
    title: string,
    href?: string,
    icon: ReactElement,
    handleClick?: () => void,
    pathname: string
}

const CustomLink = ({ title, href, icon, handleClick, pathname }: CustomLinkProps) => {
    return (
        <Link
            key={title}
            href={href ?? '#'}
            onClick={handleClick}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-primary-foreground hover:text-primary ${pathname === href ? 'bg-primary-foreground text-primary' : 'text-primary-foreground'
                }`}
        >
            {icon}
            <span>{title}</span>
        </Link>
    )
}

const BottomLinks = ({ pathname }: { pathname: string }) => {
    return (
        <div>
            <CustomLink
                pathname={pathname}
                title="Studio"
                icon={<Camera />}
                href="/studio/structure"
            />
            <CustomLink
                pathname={pathname}
                title="Home"
                icon={<Home />}
                href="/"
            />
            <CustomLink
                pathname={pathname}
                title="Logout"
                icon={<LogOut />}
                handleClick={() => signOut()}
            />
        </div>
    );
}