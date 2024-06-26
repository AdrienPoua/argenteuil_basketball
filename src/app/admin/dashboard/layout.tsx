import React from "react";
import AdminLayout from "@/layouts/Admin";
import ClientSideAuth from "@/components/ClientSideAuth";
import ServerSideAuth from "@/components/ServerSideAuth";

export default function AdminMode({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // <ClientSideAuth>
    //   <ServerSideAuth>
        <AdminLayout>{children}</AdminLayout>
    // {/* </ServerSideAuth>
    // </ClientSideAuth> */}
  );
}
