import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export default function StudioLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
