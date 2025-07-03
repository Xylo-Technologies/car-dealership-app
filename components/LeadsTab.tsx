"use client";

import { useState, useEffect } from "react";
import { Eye, Download, Filter, X, Send } from "lucide-react";
import axios from "axios";

const LeadsTab = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [filters, setFilters] = useState({
    source: "",
    status: "",
  });
  const [sources, setSources] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("/api/leads", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((res) => {
        const leadsArr = res.data.docs;
        setLeads(leadsArr);
        setFilteredLeads(leadsArr);
        // Extract unique sources and statuses
        const srcs = Array.from(
          new Set(leadsArr.map((l: any) => l.source).filter(Boolean))
        ) as string[];
        const stats = Array.from(
          new Set(leadsArr.map((l: any) => l.status).filter(Boolean))
        ) as string[];
        setSources(srcs);
        setStatuses(stats);
      })
      .catch(() => {
        setLeads([]);
        setFilteredLeads([]);
        setSources([]);
        setStatuses([]);
      });
  }, []);

  useEffect(() => {
    let filtered = leads;
    if (filters.source) {
      filtered = filtered.filter((lead) => lead.source === filters.source);
    }
    if (filters.status) {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }
    setFilteredLeads(filtered);
  }, [leads, filters]);

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
    setResponse("");
  };

  const handleSendResponse = () => {
    if (!response.trim()) return;

    const updatedLead = {
      ...selectedLead,
      responses: [
        ...selectedLead.responses,
        {
          date: new Date().toISOString(),
          message: response,
        },
      ],
    };

    setLeads(
      leads.map((lead) => (lead.id === selectedLead.id ? updatedLead : lead))
    );
    setSelectedLead(updatedLead);
    setResponse("");
    alert("Response sent successfully!");
  };

  const handleExportCSV = () => {
    const csvContent = [
      [
        "Name",
        "Email",
        "Phone",
        "Car Interest",
        "Source",
        "Status",
        "Dealership",
        "Date",
      ],
      ...filteredLeads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.vehicleInterest
          ? `${lead.vehicleInterest.year} ${lead.vehicleInterest.make} ${lead.vehicleInterest.model}`
          : "N/A",
        lead.source,
        lead.status,
        lead.dealership?.name || "",
        new Date(lead.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-yellow-100 text-yellow-800";
      case "Qualified":
        return "bg-purple-100 text-purple-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-deep-blue">Lead Management</h2>
          <p className="text-gray-600">Track and manage customer inquiries</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="btn-primary flex items-center gap-2"
        >
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
            <label className="block text-sm font-medium text-deep-blue mb-2">
              Source
            </label>
            <select
              value={filters.source}
              onChange={(e) =>
                setFilters({ ...filters, source: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Sources</option>
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-deep-blue mb-2">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
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
                  Dealership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-deep-blue">
                      {lead.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>{lead.email}</div>
                    <div>{lead.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.vehicleInterest
                      ? `${lead.vehicleInterest.year} ${lead.vehicleInterest.make} ${lead.vehicleInterest.model}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {lead.dealership?.name || ""}
                  </td>
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

      {/* Lead Details Modal */}
      {isModalOpen && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-deep-blue">
                Lead Details
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="font-semibold text-deep-blue">Name:</span>{" "}
                {selectedLead.name}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">Email:</span>{" "}
                {selectedLead.email}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">Phone:</span>{" "}
                {selectedLead.phone}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">Message:</span>{" "}
                {selectedLead.message}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">
                  Car Interest:
                </span>{" "}
                {selectedLead.vehicleInterest
                  ? `${selectedLead.vehicleInterest.year} ${selectedLead.vehicleInterest.make} ${selectedLead.vehicleInterest.model}`
                  : "N/A"}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">
                  Dealership:
                </span>{" "}
                {selectedLead.dealership?.name || ""}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">Source:</span>{" "}
                {selectedLead.source}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">Status:</span>{" "}
                {selectedLead.status}
              </div>
              <div>
                <span className="font-semibold text-deep-blue">
                  Created At:
                </span>{" "}
                {formatDate(selectedLead.createdAt)}
              </div>
              {/* Images */}
              {selectedLead.vehicleInterest?.images &&
                selectedLead.vehicleInterest.images.length > 0 && (
                  <div>
                    <span className="font-semibold text-deep-blue">
                      Images:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedLead.vehicleInterest.images.map((img: any) => (
                        <img
                          key={img._id}
                          src={
                            img.url.startsWith("http") ? img.url : `/${img.url}`
                          }
                          alt="Car"
                          className="w-24 h-16 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsTab;
