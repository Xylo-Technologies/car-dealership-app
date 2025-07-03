"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Car, Users, BarChart3, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ...inside your component

interface AdminSidebarProps {}

const AdminSidebar = ({}: AdminSidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const menuItems = [
    { id: "inventory", label: "Inventory", icon: Car },
    { id: "leads", label: "Leads", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/auth/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-deep-blue text-white p-2 rounded-lg shadow-lg"
      >
        {isCollapsed ? <Menu size={20} /> : <X size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-deep-blue text-white transition-all duration-300 ${
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-16"
            : "translate-x-0 w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="bg-gold w-8 h-8 rounded-lg flex items-center justify-center">
                <Car size={20} className="text-deep-blue" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gold">Elite Motors</h1>
                  <p className="text-sm text-gray-300">Admin Portal</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/admin/${item.id === "inventory" ? "" : item.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                      (
                        item.id === "inventory"
                          ? pathname === "/admin"
                          : pathname === `/admin/${item.id}`
                      )
                        ? "bg-gold text-deep-blue"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all duration-300"
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
