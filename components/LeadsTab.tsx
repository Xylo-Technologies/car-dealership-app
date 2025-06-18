"use client"

import { useState, useEffect } from "react"
import { Eye, Download, Filter, X, Send } from "lucide-react"
import leadsData from "../data/leads.json"

const LeadsTab = () => {
  const [leads, setLeads] = useState<any[]>([])
  const [filteredLeads, setFilteredLeads] = useState<any[]>([])
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [response, setResponse] = useState("")
  const [filters, setFilters] = useState({
    source: "",
    status: "",
  })

  useEffect(() => {
    setLeads(leadsData.leads)
    setFilteredLeads(leadsData.leads)
  }, [])

  useEffect(() => {
    let filtered = leads

    if (filters.source) {
      filtered = filtered.filter((lead) => lead.source === filters.source)
    }

    if (filters.status) {
      filtered = filtered.filter((lead) => lead.status === filters.status)
    }

    setFilteredLeads(filtered)
  }, [leads, filters])

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead)
    setIsModalOpen(true)
    setResponse("")
  }

  const handleSendResponse = () => {
    if (!response.trim()) return

    const updatedLead = {
      ...selectedLead,
      responses: [
        ...selectedLead.responses,
        {
          date: new Date().toISOString(),
          message: response,
        },
      ],
    }

    setLeads(leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead)))
    setSelectedLead(updatedLead)
    setResponse("")
    alert("Response sent successfully!")
  }

  const handleExportCSV = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Car Interest", "Source", "Status", "Date"],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.carInterest,
        lead.source,
        lead.status,
        new Date(lead.date).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Contacted":
        return "bg-yellow-100 text-yellow-800"
      case "Qualified":
        return "bg-purple-100 text-purple-800"
      case "Converted":
        return "bg-green-100 text-green-800"
      case "Lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-deep-blue">Lead Management</h2>
          <p className="text-gray-600">Track and manage customer inquiries</p>
        </div>
        <button onClick={handleExportCSV} className="btn-primary flex items-center gap-2">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter size={20} className="text-deep-blue" />
          <h3 className="text-lg font-semibold text-deep-blue">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-deep-blue mb-2">Source</label>
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Sources</option>
              {leadsData.sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-blue mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {leadsData.statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ source: "", status: "" })}
              className="px-4 py-2 text-deep-blue hover:text-gold transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-gray">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Car Interest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-deep-blue">{lead.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.email}</div>
                    <div className="text-sm text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.carInterest}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(lead.date)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewLead(lead)}
                      className="text-deep-blue hover:text-gold transition-colors duration-300"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No leads found</div>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Lead Detail Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-deep-blue">Lead Details</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedLead.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Car Interest</label>
                    <p className="text-sm text-gray-900">{selectedLead.carInterest}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Source</label>
                    <p className="text-sm text-gray-900">{selectedLead.source}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Original Message */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-3">Original Message</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700">{selectedLead.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{formatDate(selectedLead.date)}</p>
                </div>
              </div>

              {/* Response History */}
              {selectedLead.responses && selectedLead.responses.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-deep-blue mb-3">Response History</h4>
                  <div className="space-y-3">
                    {selectedLead.responses.map((response: any, index: number) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700">{response.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{formatDate(response.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Form */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-3">Send Response</h4>
                <div className="space-y-3">
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    placeholder="Type your response here..."
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSendResponse}
                      disabled={!response.trim()}
                      className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                      Send Response
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LeadsTab
