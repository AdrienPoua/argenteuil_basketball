import React from "react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function AdminMode({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin");
  }
  return <>{children}</>;
}
