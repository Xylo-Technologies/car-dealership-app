"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: MessageCircle, href: "#", label: "TikTok", color: "hover:text-black" },
  ]

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Search Inventory" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/financing", label: "Financing" },
    { href: "/trade-in", label: "Trade-In" },
  ]

  return (
    <footer className="bg-deep-blue text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gold mb-4">Elite Motors</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier destination for luxury and performance vehicles. Experience excellence in every drive with
              our carefully curated collection.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <a
                  href="tel:555-0000"
                  className="hover:text-gold transition-colors duration-300"
                  aria-label="Call us at 555-0000"
                >
                  (555) 000-0000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <a
                  href="mailto:info@elitemotors.com"
                  className="hover:text-gold transition-colors duration-300"
                  aria-label="Email us at info@elitemotors.com"
                >
                  info@elitemotors.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-gold" />
                <address className="not-italic">
                  123 Main Street
                  <br />
                  Luxury District, LD 12345
                </address>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-gold transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="text-gray-300 space-y-1 mb-6">
              <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 12:00 PM - 5:00 PM</p>
            </div>

            {/* Social Media */}
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-gray-300 ${social.color} transition-colors duration-300`}
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Elite Motors. All rights reserved.</p>

          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-gold text-sm transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-gold text-sm transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5550000"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </footer>
  )
}

export default Footer
