"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Edit, Trash2, Plus, X, Upload, Save } from "lucide-react"
import carsData from "../data/cars.json"

const carSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().min(1900).max(2030),
  trim: z.string().optional(),
  mileage: z.number().min(0),
  price: z.number().min(0),
  vin: z.string().min(17, "VIN must be 17 characters").max(17),
  condition: z.string().min(1, "Condition is required"),
  fuelType: z.string().min(1, "Fuel type is required"),
  transmission: z.string().min(1, "Transmission is required"),
  engine: z.string().optional(),
  drivetrain: z.string().min(1, "Drivetrain is required"),
  exteriorColor: z.string().min(1, "Exterior color is required"),
  interiorColor: z.string().min(1, "Interior color is required"),
  features: z.array(z.string()).optional(),
})

type CarFormData = z.infer<typeof carSchema>

interface DynamicSpec {
  name: string
  value: string
}

const InventoryTab = () => {
  const [cars, setCars] = useState<any[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCar, setEditingCar] = useState<any>(null)
  const [dynamicSpecs, setDynamicSpecs] = useState<DynamicSpec[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  })

  useEffect(() => {
    // Load cars from data
    const allCars = [...carsData.featuredCars, ...(carsData.allCars || [])]
    setCars(allCars)
  }, [])

  const handleEdit = (car: any) => {
    setEditingCar(car)
    setIsFormOpen(true)

    // Populate form
    Object.keys(car).forEach((key) => {
      if (key in carSchema.shape) {
        setValue(key as keyof CarFormData, car[key])
      }
    })

    setFeatures(car.features || [])
    setDynamicSpecs(
      car.specs?.map((spec: string) => {
        const [name, value] = spec.split(": ")
        return { name: name || spec, value: value || "true" }
      }) || [],
    )
  }

  const handleDelete = (carId: number) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setCars(cars.filter((car) => car.id !== carId))
    }
  }

  const handleAddNew = () => {
    setEditingCar(null)
    setIsFormOpen(true)
    reset()
    setFeatures([])
    setDynamicSpecs([])
  }

  const onSubmit = (data: CarFormData) => {
    const newCar = {
      ...data,
      id: editingCar?.id || Date.now(),
      features,
      specs: dynamicSpecs.map((spec) => `${spec.name}: ${spec.value}`),
      images: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
      stockNumber: `EM${String(Date.now()).slice(-3)}`,
    }

    if (editingCar) {
      setCars(cars.map((car) => (car.id === editingCar.id ? newCar : car)))
    } else {
      setCars([...cars, newCar])
    }

    setIsFormOpen(false)
    reset()
    setFeatures([])
    setDynamicSpecs([])
  }

  const addDynamicSpec = () => {
    setDynamicSpecs([...dynamicSpecs, { name: "", value: "" }])
  }

  const updateDynamicSpec = (index: number, field: "name" | "value", value: string) => {
    const updated = [...dynamicSpecs]
    updated[index][field] = value
    setDynamicSpecs(updated)
  }

  const removeDynamicSpec = (index: number) => {
    setDynamicSpecs(dynamicSpecs.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-deep-blue">Inventory Management</h2>
          <p className="text-gray-600">Manage your vehicle inventory</p>
        </div>
        <button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-light-gray">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">VIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-deep-blue uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-deep-blue">
                        {car.make} {car.model}
                      </div>
                      <div className="text-sm text-gray-500">{car.trim || "Base"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{car.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gold">
                    {formatPrice(car.price)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{car.vin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-deep-blue hover:text-gold transition-colors duration-300"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-deep-blue">
                  {editingCar ? "Edit Vehicle" : "Add New Vehicle"}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Make *</label>
                    <input
                      {...register("make")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.make ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="BMW"
                    />
                    {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Model *</label>
                    <input
                      {...register("model")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.model ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="M4 Competition"
                    />
                    {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Year *</label>
                    <input
                      {...register("year", { valueAsNumber: true })}
                      type="number"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.year ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="2024"
                    />
                    {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Trim</label>
                    <input
                      {...register("trim")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Competition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Mileage *</label>
                    <input
                      {...register("mileage", { valueAsNumber: true })}
                      type="number"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.mileage ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="1250"
                    />
                    {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Price *</label>
                    <input
                      {...register("price", { valueAsNumber: true })}
                      type="number"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.price ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="89900"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-4">Technical Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">VIN *</label>
                    <input
                      {...register("vin")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent font-mono ${
                        errors.vin ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="WBS8M9C0XP5K12345"
                      maxLength={17}
                    />
                    {errors.vin && <p className="mt-1 text-sm text-red-600">{errors.vin.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Condition *</label>
                    <select
                      {...register("condition")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.condition ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                    </select>
                    {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Fuel Type *</label>
                    <select
                      {...register("fuelType")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.fuelType ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select fuel type</option>
                      <option value="Gasoline">Gasoline</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                    {errors.fuelType && <p className="mt-1 text-sm text-red-600">{errors.fuelType.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Transmission *</label>
                    <select
                      {...register("transmission")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.transmission ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select transmission</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                      <option value="CVT">CVT</option>
                      <option value="Single Speed">Single Speed</option>
                    </select>
                    {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Engine</label>
                    <input
                      {...register("engine")}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Twin Turbo V6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Drivetrain *</label>
                    <select
                      {...register("drivetrain")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.drivetrain ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select drivetrain</option>
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                      <option value="4WD">4WD</option>
                    </select>
                    {errors.drivetrain && <p className="mt-1 text-sm text-red-600">{errors.drivetrain.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Exterior Color *</label>
                    <input
                      {...register("exteriorColor")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.exteriorColor ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Alpine White"
                    />
                    {errors.exteriorColor && (
                      <p className="mt-1 text-sm text-red-600">{errors.exteriorColor.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-deep-blue mb-2">Interior Color *</label>
                    <input
                      {...register("interiorColor")}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors.interiorColor ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Black"
                    />
                    {errors.interiorColor && (
                      <p className="mt-1 text-sm text-red-600">{errors.interiorColor.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-4">Features</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 bg-light-gray text-deep-blue px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Specs */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-4">Dynamic Specifications</h4>
                <div className="space-y-3">
                  {dynamicSpecs.map((spec, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={spec.name}
                        onChange={(e) => updateDynamicSpec(index, "name", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Specification name"
                      />
                      <input
                        value={spec.value}
                        onChange={(e) => updateDynamicSpec(index, "value", e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Value"
                      />
                      <button
                        type="button"
                        onClick={() => removeDynamicSpec(index)}
                        className="px-3 py-2 text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDynamicSpec}
                    className="px-4 py-2 bg-deep-blue text-white rounded-lg hover:bg-opacity-90 transition-colors duration-300"
                  >
                    Add Specification
                  </button>
                </div>
              </div>

              {/* Mock Image Upload */}
              <div>
                <h4 className="text-md font-semibold text-deep-blue mb-4">Images</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Mock image upload area</p>
                  <p className="text-sm text-gray-500">In production, this would handle actual image uploads</p>
                  <button
                    type="button"
                    className="mt-4 px-4 py-2 bg-light-gray text-deep-blue rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  >
                    Select Images
                  </button>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Save size={18} />
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryTab
