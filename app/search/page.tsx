"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import CarCard from "@/components/CarCard"
import SearchFilters from "@/components/SearchFilters"
import Pagination from "@/components/Pagination"
import carsData from "../../data/cars.json"

const CARS_PER_PAGE = 12

const SearchPage = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("newest")
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: [0, 300000] as [number, number],
    make: "",
    model: "",
    year: "",
    condition: "",
    mileage: [0, 100000] as [number, number],
    fuelType: "",
  })

  // Combine featured and all cars for search
  const allCars = useMemo(() => {
    const featured = carsData.featuredCars
    const additional = carsData.allCars || []
    return [...featured, ...additional]
  }, [])

  // Filter cars based on current filters
  const filteredCars = useMemo(() => {
    return allCars.filter((car) => {
      const matchesPrice = car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
      const matchesMake = !filters.make || car.make === filters.make
      const matchesYear = !filters.year || car.year.toString() === filters.year
      const matchesCondition = !filters.condition || car.condition === filters.condition
      const matchesMileage = car.mileage >= filters.mileage[0] && car.mileage <= filters.mileage[1]
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType

      return matchesPrice && matchesMake && matchesYear && matchesCondition && matchesMileage && matchesFuelType
    })
  }, [allCars, filters])

  // Sort cars
  const sortedCars = useMemo(() => {
    const sorted = [...filteredCars]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "mileage-low":
        return sorted.sort((a, b) => a.mileage - b.mileage)
      case "mileage-high":
        return sorted.sort((a, b) => b.mileage - a.mileage)
      case "year-new":
        return sorted.sort((a, b) => b.year - a.year)
      case "year-old":
        return sorted.sort((a, b) => a.year - b.year)
      case "newest":
      default:
        return sorted.sort((a, b) => b.id - a.id)
    }
  }, [filteredCars, sortBy])

  // Paginate cars
  const totalPages = Math.ceil(sortedCars.length / CARS_PER_PAGE)
  const paginatedCars = useMemo(() => {
    const startIndex = (currentPage - 1) * CARS_PER_PAGE
    return sortedCars.slice(startIndex, startIndex + CARS_PER_PAGE)
  }, [sortedCars, currentPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters, sortBy])

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "mileage-low", label: "Mileage: Low to High" },
    { value: "mileage-high", label: "Mileage: High to Low" },
    { value: "year-new", label: "Year: Newest First" },
    { value: "year-old", label: "Year: Oldest First" },
  ]

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-deep-blue mb-4">Search Our Inventory</h1>
          <p className="text-lg text-dark-gray">Find your perfect vehicle from our premium collection</p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              isOpen={showFilters}
              onToggle={() => setShowFilters(!showFilters)}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 animate-slide-up">
              <div className="mb-4 sm:mb-0">
                <p className="text-dark-gray">
                  Showing {paginatedCars.length} of {sortedCars.length} vehicles
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-gold transition-all duration-300"
                >
                  <span className="text-sm font-medium">
                    Sort: {sortOptions.find((option) => option.value === sortBy)?.label}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${showSortDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setShowSortDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-light-gray transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Cars Grid */}
            {paginatedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slide-up">
                {paginatedCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold text-deep-blue mb-2">No vehicles found</h3>
                <p className="text-dark-gray mb-4">Try adjusting your filters to see more results</p>
                <button
                  onClick={() =>
                    setFilters({
                      priceRange: [0, 300000],
                      make: "",
                      model: "",
                      year: "",
                      condition: "",
                      mileage: [0, 100000],
                      fuelType: "",
                    })
                  }
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {paginatedCars.length > 0 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
