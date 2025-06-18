"use client"

import { useState } from "react"
import { ChevronDown, Filter, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import carsData from "../data/cars.json"

interface SearchFiltersProps {
  isOpen: boolean
  onToggle: () => void
  filters: {
    priceRange: [number, number]
    make: string
    model: string
    year: string
    condition: string
    mileage: [number, number]
    fuelType: string
  }
  onFiltersChange: (filters: any) => void
}

const SearchFilters = ({ isOpen, onToggle, filters, onFiltersChange }: SearchFiltersProps) => {
  const [showMakeDropdown, setShowMakeDropdown] = useState(false)
  const [showConditionDropdown, setShowConditionDropdown] = useState(false)
  const [showFuelTypeDropdown, setShowFuelTypeDropdown] = useState(false)

  const makes = carsData.makes
  const conditions = carsData.conditions
  const fuelTypes = carsData.fuelTypes
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i)

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 300000],
      make: "",
      model: "",
      year: "",
      condition: "",
      mileage: [0, 100000],
      fuelType: "",
    })
  }

  const hasActiveFilters =
    filters.make ||
    filters.model ||
    filters.year ||
    filters.condition ||
    filters.fuelType ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 300000 ||
    filters.mileage[0] > 0 ||
    filters.mileage[1] < 100000

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={onToggle}
          className="flex items-center gap-2 bg-deep-blue text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
        >
          <Filter size={20} />
          Filters
          {hasActiveFilters && (
            <span className="bg-gold text-deep-blue px-2 py-1 rounded-full text-xs font-semibold">Active</span>
          )}
        </button>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`
        lg:block lg:sticky lg:top-24 lg:h-fit
        ${isOpen ? "block" : "hidden"}
        bg-white rounded-lg shadow-lg p-6 space-y-6
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-deep-blue">Filters</h3>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-gold hover:text-deep-blue transition-colors duration-300"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onToggle}
              className="lg:hidden text-deep-blue hover:text-gold transition-colors duration-300"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-deep-blue mb-3">Price Range</label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter("priceRange", value)}
            max={300000}
            min={0}
            step={5000}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Make */}
        <div className="relative">
          <label className="block text-sm font-medium text-deep-blue mb-2">Make</label>
          <button
            onClick={() => setShowMakeDropdown(!showMakeDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-300"
          >
            <span className={filters.make ? "text-dark-gray" : "text-gray-400"}>{filters.make || "Any Make"}</span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showMakeDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showMakeDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1 max-h-48 overflow-y-auto">
              <button
                onClick={() => {
                  updateFilter("make", "")
                  setShowMakeDropdown(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
              >
                Any Make
              </button>
              {makes.map((make) => (
                <button
                  key={make}
                  onClick={() => {
                    updateFilter("make", make)
                    setShowMakeDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
                >
                  {make}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-deep-blue mb-2">Year</label>
          <select
            value={filters.year}
            onChange={(e) => updateFilter("year", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300"
          >
            <option value="">Any Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div className="relative">
          <label className="block text-sm font-medium text-deep-blue mb-2">Condition</label>
          <button
            onClick={() => setShowConditionDropdown(!showConditionDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-300"
          >
            <span className={filters.condition ? "text-dark-gray" : "text-gray-400"}>
              {filters.condition || "Any Condition"}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showConditionDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showConditionDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
              <button
                onClick={() => {
                  updateFilter("condition", "")
                  setShowConditionDropdown(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
              >
                Any Condition
              </button>
              {conditions.map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    updateFilter("condition", condition)
                    setShowConditionDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
                >
                  {condition}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mileage Range */}
        <div>
          <label className="block text-sm font-medium text-deep-blue mb-3">Mileage Range</label>
          <Slider
            value={filters.mileage}
            onValueChange={(value) => updateFilter("mileage", value)}
            max={100000}
            min={0}
            step={1000}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{filters.mileage[0].toLocaleString()} mi</span>
            <span>{filters.mileage[1].toLocaleString()} mi</span>
          </div>
        </div>

        {/* Fuel Type */}
        <div className="relative">
          <label className="block text-sm font-medium text-deep-blue mb-2">Fuel Type</label>
          <button
            onClick={() => setShowFuelTypeDropdown(!showFuelTypeDropdown)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gold transition-all duration-300"
          >
            <span className={filters.fuelType ? "text-dark-gray" : "text-gray-400"}>
              {filters.fuelType || "Any Fuel Type"}
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showFuelTypeDropdown ? "rotate-180" : ""}`}
            />
          </button>

          {showFuelTypeDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 mt-1">
              <button
                onClick={() => {
                  updateFilter("fuelType", "")
                  setShowFuelTypeDropdown(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
              >
                Any Fuel Type
              </button>
              {fuelTypes.map((fuelType) => (
                <button
                  key={fuelType}
                  onClick={() => {
                    updateFilter("fuelType", fuelType)
                    setShowFuelTypeDropdown(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-light-gray transition-colors duration-200"
                >
                  {fuelType}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default SearchFilters
