"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import CarCard from "./CarCard"
import carsData from "../data/cars.json"

const FeaturedCars = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const featuredCars = carsData.featuredCars

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredCars.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCars.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-16 bg-light-gray" aria-labelledby="featured-cars-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 id="featured-cars-heading" className="text-3xl sm:text-4xl font-bold text-deep-blue mb-4">
            Featured Vehicles
          </h2>
          <p className="text-lg text-dark-gray max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles, each offering exceptional performance and luxury
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop View - Show all cards */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8 animate-slide-up">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Mobile/Tablet View - Carousel */}
          <div className="lg:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredCars.map((car) => (
                <div key={car.id} className="w-full flex-shrink-0 px-4">
                  <CarCard car={car} />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-deep-blue p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous car"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-deep-blue p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next car"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredCars.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-gold scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars
