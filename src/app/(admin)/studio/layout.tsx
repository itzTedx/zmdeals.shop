import { AppNavbar } from "@/components/layout/navbar/studio/app-navbar";
import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { isAdmin } from "@/lib/auth/permissions";

interface Props {
  children: React.ReactNode;
}

export default async function StudioLayout({ children }: Props) {
  await isAdmin();
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" />
      <SidebarInset>
        <AppNavbar />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
