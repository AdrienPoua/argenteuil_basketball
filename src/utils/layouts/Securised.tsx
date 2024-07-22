import React from "react";
import AdminLayout from "@/utils/layouts/Admin";
import { ClientSideAuth, ServerSideAuth } from "@/components/Auth";

export default function AdminMode({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClientSideAuth>
      <ServerSideAuth>
        <AdminLayout>{children}</AdminLayout>
      </ServerSideAuth>
    </ClientSideAuth>
  );
}