"use client";
import { Button, Typography, Box } from '@mui/material';
import { signOut } from 'next-auth/react';
import { ReactElement } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraIcon from '@mui/icons-material/Camera';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';

const data = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <DashboardIcon className="text-white" />,
  },
  {
    title: "Emails",
    href: "/admin/dashboard/emails",
    icon: <EmailIcon className="text-white" />,
  },
  {
    title: "Matchs",
    href: "/admin/dashboard/matchs",
    icon: <SportsBasketballIcon className="text-white" />,
  },
  {
    title: "Members",
    href: "/admin/dashboard/members",
    icon: <GroupIcon className="text-white" />,
  },
  {
    title: "Convocations",
    href: "/admin/dashboard/convocations",
    icon: <EventIcon className="text-white" />,
  },
  {
    title: "Derogations",
    href: "/admin/dashboard/derogations",
    icon: <TheaterComedyIcon className="text-white" />,
  },
  {
    title: "Correspondants",
    href: "/admin/dashboard/correspondants",
    icon: <SupervisorAccountIcon className="text-white" />,
  },
  {
    title: "Staffs",
    href: "/admin/dashboard/staffs",
    icon: <SchoolIcon className="text-white" />,
  },
  {
    title: "Equipes",
    href: "/admin/dashboard/equipes",
    icon: <GroupsIcon className="text-white" />,
  },
  {
    title: "FAQ",
    href: "/admin/dashboard/faq",
    icon: <HelpIcon className="text-white" />,
  },
  {
    title: "Studio",
    href: "/studio/structure",
    icon: <CameraIcon className="text-white" />,
  },
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className="text-white" />,
  },
  {
    title: "Logout",
    icon: <LogoutIcon className="text-white" />,
    serverAction: async (): Promise<void> => signOut(),
  },
];


export default function Index({ children }: Readonly<{ children: React.ReactNode }>): ReactElement {
  return (
    <Box className="flex min-h-screen" sx={{ cursor: 'auto' }}>
      {/* Sidebar */}
      <Box component="aside" className="bg-blue-600 text-white flex flex-col w-64 p-5 space-y-4" sx={{ cursor: 'auto' }}>
        {data.map(({ href, icon, title, serverAction }) => (
          <Button
            key={title}
            href={href}
            onClick={serverAction}
            className="flex items-center gap-4 p-3 rounded-md transition-all duration-200 ease-in-out hover:bg-blue-700 w-full text-left"
            variant="text"
            startIcon={icon}
          >
            <Typography className="text-lg font-medium">{title}</Typography>
          </Button>
        ))}
      </Box>

      {/* Main Content */}
      <Box className="flex-grow bg-gray-100 p-10">
        {children}
      </Box>
    </Box>
  );
}
