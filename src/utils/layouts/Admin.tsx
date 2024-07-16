import { Button, Typography, Link, Box } from '@mui/material'

const NavItem = ({ logo, title, href }: Readonly<{ title: string, href: string, logo: string }>) => {
  return (
    <Button className="w-full h-20" variant="contained">
      <Link href={href} className="w-full flex justify-center items-center">
        {logo}
        <Typography className="text-center ms-5">{title}</Typography>
      </Link>
    </Button>
  )
}


const data = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    logo: "🏠"
  },
  {
    title: "Membres",
    href: "/admin/dashboard/members",
    logo: "👥"
  },
  {
    title: "Logout",
    href: "/admin/logout",
    logo: "🚪"
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    logo: "⚙️"
  }
];

export default function Page({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box className="flex size-full min-h-svh">
      <Box className="w-1/6 bg-primary-light flex flex-col" component="aside" >
        {data.map((item, index) => (
          <NavItem
            key={item.title}
            title={item.title}
            href={item.href}
            logo={item.logo}
          />
        ))}
      </Box>
      <Box className="flex flex-col grow bg-gray-100 p-5">
        {children}
      </Box>
    </Box>
  );
}
