"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, Mail, Lock, Shield } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mfaEnabled: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

const AdminLoginPage = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mfaEnabled: false,
    },
  })

  const mfaEnabled = watch("mfaEnabled")

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setLoginError("")

    // Mock authentication
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock validation (admin@elitemotors.com / admin123)
    if (data.email === "admin@elitemotors.com" && data.password === "admin123") {
      // Mock MFA if enabled
      if (data.mfaEnabled) {
        const mfaCode = prompt("Enter MFA Code (use: 123456)")
        if (mfaCode !== "123456") {
          setLoginError("Invalid MFA code")
          setIsLoading(false)
          return
        }
      }

      // Store auth state (in real app, use proper auth)
      localStorage.setItem("adminAuth", "true")
      router.push("/admin")
    } else {
      setLoginError("Invalid email or password")
    }

    setIsLoading(false)
  }

  const handleForgotPassword = () => {
    alert("Password reset link would be sent to your email address.")
  }

  return (
    <div className="min-h-screen bg-deep-blue flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gold mb-2">Elite Motors</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Admin Portal</h2>
          <p className="text-gray-300">Sign in to access the dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-deep-blue mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-deep-blue mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            {/* MFA Toggle */}
            <div className="flex items-center">
              <input
                {...register("mfaEnabled")}
                type="checkbox"
                id="mfaEnabled"
                className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
              />
              <label htmlFor="mfaEnabled" className="ml-2 block text-sm text-deep-blue">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-gold" />
                  Enable Multi-Factor Authentication
                </div>
              </label>
            </div>

            {mfaEnabled && (
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-3 animate-fade-in">
                <p className="text-sm text-deep-blue">
                  <strong>Demo MFA:</strong> Use code <code className="bg-gold/20 px-1 rounded">123456</code> when
                  prompted
                </p>
              </div>
            )}

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in">
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Demo Credentials:</strong>
                <br />
                Email: admin@elitemotors.com
                <br />
                Password: admin123
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-deep-blue hover:text-gold transition-colors duration-300"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300 text-sm">
          <p>&copy; 2024 Elite Motors. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
