"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/AdminSidebar"
import InventoryTab from "@/components/InventoryTab"
import LeadsTab from "@/components/LeadsTab"

const AdminDashboard = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("inventory")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("adminAuth")
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gold border-t-transparent"></div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "inventory":
        return <InventoryTab />
      case "leads":
        return <LeadsTab />
      case "analytics":
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-deep-blue mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-600">Advanced analytics and reporting features will be available here.</p>
          </div>
        )
      case "settings":
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚙️</div>
            <h3 className="text-xl font-semibold text-deep-blue mb-2">Settings Coming Soon</h3>
            <p className="text-gray-600">System settings and configuration options will be available here.</p>
          </div>
        )
      default:
        return <InventoryTab />
    }
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="lg:ml-64 transition-all duration-300">
        <div className="p-6 lg:p-8">
          <div className="animate-fade-in">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
