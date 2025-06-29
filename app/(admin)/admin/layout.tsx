import AdminSidebar from "@/components/AdminSidebar";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-light-gray">
      <AdminSidebar />
      <div className="lg:ml-64 transition-all duration-300">
        <div className="p-6 lg:p-8">
          <AdminAuthGuard>
            <div className="animate-fade-in">{children}</div>
          </AdminAuthGuard>
        </div>
      </div>
    </div>
  );
}
