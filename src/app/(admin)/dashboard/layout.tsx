import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/services/nextAuth/auth";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-6xl font-bold">Unauthorized</h1>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-16 size-full">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
