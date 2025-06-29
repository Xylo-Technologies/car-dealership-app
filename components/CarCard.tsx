"use client";

import Image from "next/image";
import { Calendar, Gauge } from "lucide-react";
import Link from "next/link";
import type { Car } from "@/store/carsSlice";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            car.images && car.images.length > 0
              ? car.images[0].url
              : "/placeholder.svg"
          }
          alt={`${car.year} ${car.make} ${car.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-gold text-white px-2 py-1 rounded-full text-sm font-semibold">
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-deep-blue">
            {car.year} {car.make}
          </h3>
          <span className="text-2xl font-bold text-gold">
            {formatPrice(car.price)}
          </span>
        </div>

        <h4 className="text-lg text-dark-gray mb-4 font-medium">{car.model}</h4>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-dark-gray">
          <div className="flex items-center gap-1">
            <Calendar size={16} className="text-deep-blue" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge size={16} className="text-deep-blue" />
            <span>{formatMileage(car.mileage ?? 0)} mi</span>
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {car.features &&
            car.features.slice(0, 2).map((feature: string, index: number) => (
              <span
                key={index}
                className="bg-light-gray text-deep-blue px-2 py-1 rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
        </div>

        {/* CTA Button */}
        <Link
          href={`/cars/${car._id}`}
          className="w-full btn-secondary text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
