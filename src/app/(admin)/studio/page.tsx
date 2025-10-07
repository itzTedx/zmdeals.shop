import { isAdmin } from "@/lib/auth/permissions";

export default async function DashboardPage() {
  const session = await isAdmin();

  console.log("session: ", session);
  return (
    <div>
      <div className="min-h-screen">Hello</div>
      <div className="min-h-screen">Hello</div>
    </div>
  );
}
