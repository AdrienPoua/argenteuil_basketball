"use client";
import { Button, Typography, Box } from '@mui/material';
import { signOut } from 'next-auth/react';

type NavItemProps = {
  title: string;
  logo: string;
  href: string;
}

const NavItem = ({ logo, title, href }: NavItemProps) => {
  return (
    <Button href={href} className="h-20" fullWidth variant="contained">
      <Typography className="ms-5"> {logo} {title}</Typography>
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
    title: "emails",
    href: "/admin/dashboard/emails",
    logo: "📧"
  },
  {
    title: "Matchs",
    href: "/admin/dashboard/matchs",
    logo: "🏀"
  },
  {
    title: "Members",
    href: "/admin/dashboard/members",
    logo: "👥"
  },
  {
    title: "Convocations",
    href: "/admin/dashboard/convocations",
    logo: "📅"
  }
];

export default function Page({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box className="flex size-full min-h-svh">
      <Box className="w-1/6 bg-primary-light flex flex-col" component="aside">
        {data.map((item) => (
          <NavItem
            key={item.title}
            title={item.title}
            href={item.href}
            logo={item.logo}
          />
        ))}
        <Button className="h-20" fullWidth variant="contained"
          onClick={async () => signOut()}>
          <Typography className="ms-5"> 🚪 Logout</Typography>
        </Button>
      </Box>
      <Box className="flex flex-col grow bg-gray-100 p-5 justify-center items-center">
        {children}
      </Box>
    </Box>
  );
}
