"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import axios from "axios";

console.log("AdminRegisterPage mounted");

const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    dealership: z.string().min(1, "Dealership is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function AdminRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState(false);
  const [dealerships, setDealerships] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    axios
      .get("/api/dealerships")
      .then((res) => {
        console.log("Dealerships API response:", res);
        setDealerships(res.data);
      })
      .catch((err) => {
        console.log("Dealerships API error:", err);
        setDealerships([]);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError("");
    setSuccess(false);
    try {
      await axios.post("/api/auth/register", {
        email: data.email,
        password: data.password,
        role: "Admin",
        dealership: data.dealership,
      });
      setSuccess(true);
      reset();
    } catch (err: any) {
      setRegisterError(err.response?.data?.error || "Registration failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-deep-blue flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gold mb-2">Elite Motors</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">
            Admin Portal
          </h2>
          <p className="text-gray-300">Create your admin account</p>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8 animate-slide-up">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-deep-blue mb-2"
              >
                Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-deep-blue mb-2"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-deep-blue mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                type="password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-deep-blue mb-2"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="dealership"
                className="block text-sm font-medium text-deep-blue mb-2"
              >
                Dealership
              </label>
              <select
                {...register("dealership")}
                id="dealership"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                  errors.dealership ? "border-red-500" : "border-gray-300"
                }`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a dealership
                </option>
                {dealerships.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.dealership && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dealership.message}
                </p>
              )}
            </div>
            {registerError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 animate-fade-in">
                <p className="text-sm text-red-600">{registerError}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in">
                <p className="text-sm text-green-700">
                  Registration successful! You can now{" "}
                  <Link
                    href="/admin/auth/login"
                    className="text-gold underline"
                  >
                    login
                  </Link>
                  .
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </button>
            <div className="text-center">
              <Link
                href="/admin/auth/login"
                className="text-sm text-deep-blue hover:text-gold transition-colors duration-300"
              >
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
        <div className="text-center text-gray-300 text-sm">
          <p>&copy; 2024 Elite Motors. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
