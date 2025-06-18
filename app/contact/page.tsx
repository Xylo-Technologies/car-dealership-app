"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Send, User, Mail, Phone, MessageSquare, MapPin, Clock, Facebook, Instagram, MessageCircle } from "lucide-react"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Contact form submitted:", data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/elitemotors",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/elitemotors",
      label: "Instagram",
      color: "hover:text-pink-600",
    },
    {
      icon: MessageCircle,
      href: "https://tiktok.com/@elitemotors",
      label: "TikTok",
      color: "hover:text-black",
    },
  ]

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Hero Section */}
      <section className="relative bg-deep-blue text-white py-20" role="banner">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue to-deep-blue/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Contact
            <span className="block text-gold">Elite Motors</span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto font-light">
            Ready to find your dream car? Get in touch with our expert team today
          </p>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-deep-blue mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center animate-fade-in">
                    <div className="text-green-600 text-4xl mb-4">✓</div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700">
                      Thank you for contacting Elite Motors. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-deep-blue mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          {...register("name")}
                          type="text"
                          id="name"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-deep-blue mb-2">
                        Email Address *
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
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-deep-blue mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          {...register("phone")}
                          type="tel"
                          id="phone"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-deep-blue mb-2">
                        Subject *
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 ${
                          errors.subject ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="What can we help you with?"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-deep-blue mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                        <textarea
                          {...register("message")}
                          id="message"
                          rows={5}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-300 resize-none ${
                            errors.message ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up">
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-deep-blue mb-6">Get in Touch</h2>

                  <div className="space-y-6">
                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="bg-gold/10 p-3 rounded-full">
                        <Phone className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue mb-1">Phone</h3>
                        <a
                          href="tel:555-0000"
                          className="text-dark-gray hover:text-gold transition-colors duration-300"
                        >
                          (555) 000-0000
                        </a>
                        <p className="text-sm text-gray-600 mt-1">Monday - Friday: 9AM - 8PM</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="bg-gold/10 p-3 rounded-full">
                        <Mail className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue mb-1">Email</h3>
                        <a
                          href="mailto:info@elitemotors.com"
                          className="text-dark-gray hover:text-gold transition-colors duration-300"
                        >
                          info@elitemotors.com
                        </a>
                        <p className="text-sm text-gray-600 mt-1">We'll respond within 24 hours</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="bg-gold/10 p-3 rounded-full">
                        <MapPin className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue mb-1">Address</h3>
                        <address className="text-dark-gray not-italic">
                          123 Main Street
                          <br />
                          Luxury District, LD 12345
                        </address>
                        <p className="text-sm text-gray-600 mt-1">Visit our premium showroom</p>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start gap-4">
                      <div className="bg-gold/10 p-3 rounded-full">
                        <Clock className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue mb-1">Business Hours</h3>
                        <div className="text-dark-gray text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Monday - Friday:</span>
                            <span>9:00 AM - 8:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday:</span>
                            <span>9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday:</span>
                            <span>12:00 PM - 5:00 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-deep-blue mb-6">Follow Us</h2>
                  <p className="text-dark-gray mb-6">
                    Stay connected with Elite Motors for the latest inventory updates, automotive news, and exclusive
                    offers.
                  </p>

                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-light-gray p-3 rounded-full ${social.color} transition-all duration-300 hover:scale-110`}
                        aria-label={`Follow us on ${social.label}`}
                      >
                        <social.icon size={24} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="aspect-video">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/5550000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gold hover:bg-gold/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 animate-bounce"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  )
}

export default ContactPage
