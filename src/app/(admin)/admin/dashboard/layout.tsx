import React from "react";
import AdminLayout from "@/utils/layouts/Admin";
import ClientSideAuth from "@/components/Auth/ClientSideAuth";
import ServerSideAuth from "@/components/Auth/ServerSideAuth";

export default function AdminMode({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientSideAuth>
      <ServerSideAuth>
        <AdminLayout>{children}</AdminLayout>
      </ServerSideAuth>
    </ClientSideAuth>
  );
}