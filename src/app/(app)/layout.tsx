import { cookies } from "next/headers";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import { Topbar } from "@/components/shell/Topbar";
import { ToastProvider } from "@/components/ui/Toast";
import LoadingBar from "@/components/LoadingBar";
import { WelcomePopup } from "@/components/WelcomePopup";
import { decodeSession } from "@/lib/session";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = decodeSession(cookieStore.get("ls_session")?.value ?? "");
  const isAdmin = session?.isAdmin ?? false;

  return (
    <ToastProvider>
      <LoadingBar />
      <WelcomePopup />
      <div className="h-screen overflow-hidden" style={{ background: "#0F2318" }}>
        <Sidebar isAdmin={isAdmin} />
        <div className="md:ml-60 h-full flex flex-col">
          <Topbar />
          <main className="flex-1 min-h-0 overflow-y-auto pb-20 md:pb-8">{children}</main>
        </div>
        <BottomNav />
      </div>
    </ToastProvider>
  );
}
