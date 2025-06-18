"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, Save, Palette, Bell, Building, Phone } from "lucide-react"

const settingsSchema = z.object({
  dealershipName: z.string().min(2, "Dealership name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter a complete address"),
  whatsappNumber: z.string().min(10, "Please enter a valid WhatsApp number"),
  description: z.string().max(500, "Description must be less than 500 characters"),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  emailAlerts: z.boolean(),
  smsAlerts: z.boolean(),
  pushNotifications: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

const SettingsTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      dealershipName: "Elite Motors",
      email: "info@elitemotors.com",
      phone: "(555) 000-0000",
      address: "123 Main Street, Luxury District, LD 12345",
      whatsappNumber: "(555) 000-0000",
      description: "Premium luxury car dealership specializing in high-end vehicles and exceptional customer service.",
      primaryColor: "#1E3A8A",
      secondaryColor: "#D4AF37",
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
    },
  })

  const primaryColor = watch("primaryColor")
  const secondaryColor = watch("secondaryColor")

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: SettingsFormData) => {
    setIsLoading(true)

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Settings saved:", data)
    alert("Settings saved successfully!")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-deep-blue">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your dealership configuration and preferences</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Dealership Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-blue">
              <Building size={20} />
              Dealership Information
            </CardTitle>
            <CardDescription>Update your dealership's basic information and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dealershipName">Dealership Name</Label>
                <Input
                  id="dealershipName"
                  {...register("dealershipName")}
                  className="focus:ring-deep-blue focus:border-deep-blue"
                />
                {errors.dealershipName && <p className="text-sm text-red-600">{errors.dealershipName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="focus:ring-deep-blue focus:border-deep-blue"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} className="focus:ring-deep-blue focus:border-deep-blue" />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber" className="flex items-center gap-2">
                  <Phone size={16} />
                  WhatsApp Number
                </Label>
                <Input
                  id="whatsappNumber"
                  {...register("whatsappNumber")}
                  className="focus:ring-deep-blue focus:border-deep-blue"
                />
                {errors.whatsappNumber && <p className="text-sm text-red-600">{errors.whatsappNumber.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} className="focus:ring-deep-blue focus:border-deep-blue" />
              {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={3}
                className="focus:ring-deep-blue focus:border-deep-blue"
                placeholder="Brief description of your dealership..."
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-blue">
              <Upload size={20} />
              Logo & Branding
            </CardTitle>
            <CardDescription>Upload your dealership logo and customize brand colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Dealership Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  {logoPreview ? (
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Upload size={24} className="text-gray-400" />
                  )}
                </div>
                <div>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="focus:ring-deep-blue focus:border-deep-blue"
                  />
                  <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="flex items-center gap-2">
                  <Palette size={16} />
                  Primary Color
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    type="color"
                    {...register("primaryColor")}
                    className="w-16 h-10 p-1 border rounded cursor-pointer"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setValue("primaryColor", e.target.value)}
                    className="flex-1 focus:ring-deep-blue focus:border-deep-blue"
                    placeholder="#1E3A8A"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryColor" className="flex items-center gap-2">
                  <Palette size={16} />
                  Secondary Color
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="secondaryColor"
                    type="color"
                    {...register("secondaryColor")}
                    className="w-16 h-10 p-1 border rounded cursor-pointer"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setValue("secondaryColor", e.target.value)}
                    className="flex-1 focus:ring-deep-blue focus:border-deep-blue"
                    placeholder="#D4AF37"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-deep-blue">
              <Bell size={20} />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you want to receive alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailAlerts">Email Alerts</Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                id="emailAlerts"
                checked={watch("emailAlerts")}
                onCheckedChange={(checked) => setValue("emailAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsAlerts">SMS Alerts</Label>
                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
              </div>
              <Switch
                id="smsAlerts"
                checked={watch("smsAlerts")}
                onCheckedChange={(checked) => setValue("smsAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive browser push notifications</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={watch("pushNotifications")}
                onCheckedChange={(checked) => setValue("pushNotifications", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gold hover:bg-gold/90 text-deep-blue font-semibold px-8 py-2 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-deep-blue border-t-transparent mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SettingsTab
