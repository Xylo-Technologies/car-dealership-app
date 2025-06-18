"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury sports car in showroom"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Discover Your Dream Car
          <span className="block text-gold">at Elite Motors</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto font-light">
          Experience luxury, performance, and excellence with our premium collection of vehicles
        </p>

        <button
          className="btn-primary text-lg inline-flex items-center gap-2 group"
          aria-label="Browse our vehicle inventory"
        >
          Browse Inventory
          <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
