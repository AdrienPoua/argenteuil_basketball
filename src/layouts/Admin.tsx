import { Box } from "@mui/material";
import Aside from "@/components/Aside";
import AsideItem from "@/components/AsideItem";

const data = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    logo : "🏠"
  },
  {
    title: "Membres",
    href: "/admin/dashboard/members",
    logo : "👥"
  },
  {
    title: "Logout",
    href: "/admin/logout",
    logo : "🚪"
  },
];

const items = data.map((item, index) => (
  <AsideItem
    key={item.title}
    title={item.title}
    href={item.href}
    logo={item.logo}
  />
));


export default function Page({children} : Readonly<{children: React.ReactNode}>) {
  return (
    <Box className="flex size-full min-h-svh">
      <Aside>
        {items}
      </Aside>
      <Box className="flex flex-col grow bg-gray-100 p-5">
        {children}
      </Box>
    </Box>
  );
}
