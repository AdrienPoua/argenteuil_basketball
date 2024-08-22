"use client";
import { Button, Typography, Box } from '@mui/material';
import { signOut } from 'next-auth/react';
import { ReactElement } from 'react';

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
  },
  {
    title: "Derogations",
    href: "/admin/dashboard/derogations",
    logo: "🎭"
  },
  {
    title: "Correspondants",
    href: "/admin/dashboard/correspondants",
    logo: "👲"
  },
  {
    title: "FAQ",
    href: "/admin/dashboard/faq",
    logo: "❓"
  },
  {
    title: "Logout",
    logo: "🚪",
    serverAction: async (): Promise<void> => signOut()
  },
];

export default function Index({ children }: Readonly<{ children: React.ReactNode }>): ReactElement {
  return (
    <Box className="flex size-full min-h-svh">
      <Box className=" bg-gray-100 flex flex-col w-48 h-svh" component="aside">
        {data.map(({ href, logo, title, serverAction }) => (
          <Button onClick={serverAction} key={title} href={href} className='flex gap-5 items-center py-5 group rounded-none  w-fit' variant="contained">
            <Typography className="text-5xl min-w-20">{logo}</Typography>
            <Typography className="hidden group-hover:flex">{title}</Typography>
          </Button>
        ))}
      </Box>
      <Box className="flex flex-col grow bg-gray-100 p-5 justify-center items-center">
        {children}
      </Box>
    </Box>
  );
}
