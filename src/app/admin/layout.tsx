import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#0F2318" }}>
      <AdminSidebar />
      <div className="md:ml-60 flex flex-col min-h-screen">
        <main className="flex-1 p-6 pb-24 md:p-8 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
