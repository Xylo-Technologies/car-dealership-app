"use client"

import { useState, useRef, useEffect } from "react"
import { Search, ChevronDown, X } from "lucide-react"
import carsData from "../data/cars.json"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [showPriceDropdown, setShowPriceDropdown] = useState(false)
  const [showYearDropdown, setShowYearDropdown] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)

  const suggestions = carsData.searchSuggestions
  const priceRanges = [
    { label: "Under $25k", value: "0-25000" },
    { label: "$25k - $50k", value: "25000-50000" },
    { label: "$50k - $75k", value: "50000-75000" },
    { label: "$75k - $100k", value: "75000-100000" },
    { label: "Over $100k", value: "100000+" },
  ]

  const years = Array.from({ length: 6 }, (_, i) => 2025 - i)

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setShowPriceDropdown(false)
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    // Mock search functionality
    console.log("Searching for:", { searchTerm, selectedPriceRange, selectedYear })
    // In a real app, this would trigger a search API call
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedPriceRange("")
    setSelectedYear("")
  }

  return (
    <section className="py-16 bg-white" aria-labelledby="search-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 id="search-heading" className="text-3xl font-bold text-deep-blue mb-4">
            Find Your Perfect Car
          </h2>
          <p className="text-lg text-dark-gray">Search through our premium inventory with advanced filters</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-xl p-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Input */}
            <div className="md:col-span-2 relative" ref={searchRef}>
              <label htmlFor="car-search" className="sr-only">
                Search for cars
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="car-search"
                  type="text"
                  placeholder="Search by make, model..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setShowSuggestions(true)
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && searchTerm && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                  {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchTerm(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-light-gray transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className="relative" ref={priceRef}>
              <label htmlFor="price-range" className="sr-only">
                Select price range
              </label>
              <button
                id="price-range"
                onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-300"
              >
                <span className={selectedPriceRange ? "text-dark-gray" : "text-gray-400"}>
                  {selectedPriceRange
                    ? priceRanges.find((range) => range.value === selectedPriceRange)?.label
                    : "Price Range"}
                </span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${showPriceDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showPriceDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => {
                        setSelectedPriceRange(range.value)
                        setShowPriceDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-light-gray transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Year Dropdown */}
            <div className="relative" ref={yearRef}>
              <label htmlFor="year-select" className="sr-only">
                Select year
              </label>
              <button
                id="year-select"
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-300"
              >
                <span className={selectedYear ? "text-dark-gray" : "text-gray-400"}>{selectedYear || "Year"}</span>
                <ChevronDown
                  size={20}
                  className={`transition-transform duration-300 ${showYearDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showYearDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year.toString())
                        setShowYearDropdown(false)
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-light-gray transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleSearch} className="btn-primary flex items-center justify-center gap-2">
              <Search size={20} />
              Search Vehicles
            </button>

            {(searchTerm || selectedPriceRange || selectedYear) && (
              <button
                onClick={clearFilters}
                className="text-deep-blue hover:text-gold transition-colors duration-300 flex items-center justify-center gap-2 font-medium"
              >
                <X size={16} />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBar
