"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Allow access to login and register pages without auth
    if (
      pathname === "/admin/auth/login" ||
      pathname === "/admin/auth/register"
    ) {
      setIsLoading(false);
      return;
    }
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/auth/login");
      return;
    }
    // Optionally, check if token is expired
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem("adminToken");
        router.push("/admin/auth/login");
        return;
      }
    } catch {
      localStorage.removeItem("adminToken");
      router.push("/admin/auth/login");
      return;
    }
    setIsLoading(false);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent"></div>
      </div>
    );
  }

  return <>{children}</>;
}
