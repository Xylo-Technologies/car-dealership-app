"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  MapPin,
  FileText,
  Car,
  Phone,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import carsData from "../../../../data/cars.json";

const CarDetailPage = () => {
  const params = useParams();
  const carId = Number.parseInt(params.id as string);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Find car from both featured and all cars
  const allCars = [...carsData.featuredCars, ...(carsData.allCars || [])];
  const car = allCars.find((c) => c.id === carId);

  // Auto-play carousel
  useEffect(() => {
    if (!car || !isAutoPlaying || car.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [car, isAutoPlaying]);

  if (!car) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-2xl font-bold text-deep-blue mb-4">
            Vehicle Not Found
          </h1>
          <p className="text-dark-gray mb-6">
            The vehicle you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/search" className="btn-primary">
            Browse Our Inventory
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
    setIsAutoPlaying(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-US").format(mileage);
  };

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 animate-fade-in" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-deep-blue hover:text-gold transition-colors duration-300"
            >
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href="/search"
              className="text-deep-blue hover:text-gold transition-colors duration-300"
            >
              Search
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-dark-gray">
              {car.year} {car.make} {car.model}
            </span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Carousel */}
          <div className="animate-slide-up">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-96 sm:h-[500px]">
                <Image
                  src={car.images[currentImageIndex] || "/placeholder.svg"}
                  alt={`${car.year} ${car.make} ${car.model} - Image ${
                    currentImageIndex + 1
                  }`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />

                {/* Navigation Arrows */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-deep-blue p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-deep-blue p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                      aria-label="Next image"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {car.images.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {car.images.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto">
                  {car.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        index === currentImageIndex
                          ? "border-gold"
                          : "border-gray-300 hover:border-gold"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {car.condition}
                  </span>
                  <span className="text-sm text-gray-600">
                    Stock #{car.stockNumber}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-deep-blue mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                <div className="text-3xl font-bold text-gold mb-4">
                  {formatPrice(car.price)}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-dark-gray">
                  <Calendar size={18} className="text-deep-blue" />
                  <span>{car.year}</span>
                </div>
                <div className="flex items-center gap-2 text-dark-gray">
                  <Gauge size={18} className="text-deep-blue" />
                  <span>{formatMileage(car.mileage)} mi</span>
                </div>
                <div className="flex items-center gap-2 text-dark-gray">
                  <Fuel size={18} className="text-deep-blue" />
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-dark-gray">
                  <Settings size={18} className="text-deep-blue" />
                  <span>{car.transmission}</span>
                </div>
              </div>

              {/* Specs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-deep-blue mb-3">
                  Key Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {car.specs.map((spec, index) => (
                    <span
                      key={index}
                      className="bg-light-gray text-deep-blue px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full btn-primary flex items-center justify-center gap-2">
                  <Car size={18} />
                  Request Test Drive
                </button>
                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                  <Phone size={18} />
                  Contact Dealer
                </button>
                <button className="w-full border border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <FileText size={18} />
                  View Window Sticker
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Specifications */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-deep-blue mb-6">
                Vehicle Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Make</span>
                      <span className="font-medium">{car.make}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Model</span>
                      <span className="font-medium">{car.model}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Year</span>
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Condition</span>
                      <span className="font-medium">{car.condition}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Mileage</span>
                      <span className="font-medium">
                        {formatMileage(car.mileage)} mi
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Technical Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Fuel Type</span>
                      <span className="font-medium">{car.fuelType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Transmission</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Drivetrain</span>
                      <span className="font-medium">{car.drivetrain}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Exterior Color</span>
                      <span className="font-medium">{car.exteriorColor}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Interior Color</span>
                      <span className="font-medium">{car.interiorColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-deep-blue mb-4">
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">VIN</span>
                      <span className="font-medium font-mono text-sm">
                        {car.vin}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Stock Number</span>
                      <span className="font-medium">{car.stockNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-deep-blue mb-4">
                    Features & Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 py-1">
                        <div className="w-2 h-2 bg-gold rounded-full"></div>
                        <span className="text-dark-gray">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-deep-blue mb-6 flex items-center gap-2">
                <MapPin size={24} />
                Our Location
              </h2>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.71278937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e15a187%3A0x3b2e4b8b8b8b8b8b!2sNew%20York%2C%20NY%2010013%2C%20USA!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Elite Motors Location"
                ></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-dark-gray">
                  <strong>Elite Motors</strong>
                  <br />
                  123 Main Street
                  <br />
                  Luxury District, LD 12345
                  <br />
                  <a
                    href="tel:555-0000"
                    className="text-gold hover:text-deep-blue transition-colors duration-300"
                  >
                    (555) 000-0000
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-deep-blue mb-6">
                Contact Us
              </h2>
              <ContactForm
                carInfo={{
                  make: car.make,
                  model: car.model,
                  year: car.year,
                  stockNumber: car.stockNumber,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
