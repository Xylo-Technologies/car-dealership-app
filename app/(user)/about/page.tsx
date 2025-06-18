"use client"

import Image from "next/image"
import { MapPin, Star, Users, Award, Clock } from "lucide-react"

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Michael Rodriguez",
      role: "General Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "With over 15 years in luxury automotive sales, Michael leads our team with passion and expertise.",
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Sales Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Sarah specializes in matching clients with their perfect vehicle, ensuring exceptional customer experiences.",
    },
    {
      id: 3,
      name: "David Thompson",
      role: "Finance Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "David helps customers secure the best financing options with his extensive knowledge of automotive lending.",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Walsh",
      rating: 5,
      quote:
        "Elite Motors exceeded all my expectations. The team was professional, knowledgeable, and helped me find the perfect BMW. The entire process was seamless!",
      location: "New York, NY",
    },
    {
      id: 2,
      name: "Robert Kim",
      rating: 5,
      quote:
        "Outstanding service from start to finish. They made buying my Tesla Model S an absolute pleasure. I highly recommend Elite Motors to anyone looking for luxury vehicles.",
      location: "Brooklyn, NY",
    },
    {
      id: 3,
      name: "Maria Gonzalez",
      rating: 5,
      quote:
        "The attention to detail and customer service at Elite Motors is unmatched. They truly care about finding the right car for each customer. Five stars!",
      location: "Manhattan, NY",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={16} className={index < rating ? "text-gold fill-current" : "text-gray-300"} />
    ))
  }

  return (
    <div className="min-h-screen bg-light-gray">
      {/* Hero Section */}
      <section className="relative bg-deep-blue text-white py-20" role="banner">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue to-deep-blue/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Elite Motors
            <span className="block text-gold">Your Trusted Partner</span>
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto font-light">
            Delivering exceptional luxury automotive experiences with integrity, expertise, and personalized service
            since 2010
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 id="mission-heading" className="text-3xl sm:text-4xl font-bold text-deep-blue mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-dark-gray max-w-4xl mx-auto leading-relaxed">
              At Elite Motors, we are committed to providing an unparalleled luxury automotive experience. Our mission
              is to connect discerning customers with their dream vehicles while delivering exceptional service that
              exceeds expectations at every touchpoint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            <div className="text-center p-6">
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-deep-blue mb-3">Excellence</h3>
              <p className="text-dark-gray">
                We maintain the highest standards in every aspect of our business, from vehicle selection to customer
                service.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-deep-blue mb-3">Trust</h3>
              <p className="text-dark-gray">
                Building lasting relationships through transparency, honesty, and reliable service that our customers
                can depend on.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-gold" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-deep-blue mb-3">Dedication</h3>
              <p className="text-dark-gray">
                Our commitment to going above and beyond ensures every customer receives personalized attention and
                care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-light-gray" aria-labelledby="history-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 id="history-heading" className="text-3xl sm:text-4xl font-bold text-deep-blue mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-dark-gray leading-relaxed">
                <p>
                  Founded in 2010 by automotive enthusiasts with a vision to revolutionize the luxury car buying
                  experience, Elite Motors began as a small boutique dealership in the heart of New York's luxury
                  district.
                </p>
                <p>
                  Over the past decade, we have grown from a modest showroom to one of the region's most trusted names
                  in premium automotive sales. Our success stems from an unwavering commitment to quality, integrity,
                  and customer satisfaction.
                </p>
                <p>
                  Today, Elite Motors represents the finest selection of luxury and performance vehicles, backed by a
                  team of dedicated professionals who share our passion for automotive excellence. We continue to evolve
                  and innovate while staying true to our core values of trust, quality, and exceptional service.
                </p>
                <p>
                  As we look to the future, Elite Motors remains committed to being your trusted partner in finding not
                  just a vehicle, but the perfect driving experience that matches your lifestyle and aspirations.
                </p>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1562141961-d0a4d2d0d6b4?w=600&h=400&fit=crop"
                  alt="Elite Motors luxury car showroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 id="team-heading" className="text-3xl sm:text-4xl font-bold text-deep-blue mb-6">
              Meet Our Team
            </h2>
            <p className="text-lg text-dark-gray max-w-3xl mx-auto">
              Our experienced professionals are dedicated to providing you with exceptional service and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                <div className="relative h-64">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-blue mb-2">{member.name}</h3>
                  <p className="text-gold font-semibold mb-3">{member.role}</p>
                  <p className="text-dark-gray text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-light-gray" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-deep-blue mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-dark-gray max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 card-hover">
                <div className="flex items-center mb-4">{renderStars(testimonial.rating)}</div>
                <blockquote className="text-dark-gray mb-4 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="border-t border-gray-200 pt-4">
                  <cite className="not-italic">
                    <div className="font-semibold text-deep-blue">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 bg-white" aria-labelledby="location-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2
              id="location-heading"
              className="text-3xl sm:text-4xl font-bold text-deep-blue mb-6 flex items-center justify-center gap-3"
            >
              <MapPin size={32} className="text-gold" />
              Visit Our Showroom
            </h2>
            <p className="text-lg text-dark-gray max-w-3xl mx-auto">
              Experience our premium collection in person at our luxury showroom
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.71278937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e15a187%3A0x3b2e4b8b8b8b8b8b!2sNew%20York%2C%20NY%2010013%2C%20USA!5e0!3m2!1sen!2sus!4v1635959999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Elite Motors Showroom Location"
              ></iframe>
            </div>

            <div className="flex flex-col justify-center">
              <div className="bg-light-gray rounded-lg p-6">
                <h3 className="text-xl font-bold text-deep-blue mb-4">Showroom Information</h3>
                <div className="space-y-3 text-dark-gray">
                  <div>
                    <strong>Address:</strong>
                    <br />
                    123 Main Street
                    <br />
                    Luxury District, LD 12345
                  </div>
                  <div>
                    <strong>Phone:</strong>
                    <br />
                    <a href="tel:555-0000" className="text-gold hover:text-deep-blue transition-colors duration-300">
                      (555) 000-0000
                    </a>
                  </div>
                  <div>
                    <strong>Email:</strong>
                    <br />
                    <a
                      href="mailto:info@elitemotors.com"
                      className="text-gold hover:text-deep-blue transition-colors duration-300"
                    >
                      info@elitemotors.com
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-deep-blue mb-2">Business Hours</h4>
                  <div className="text-sm text-dark-gray space-y-1">
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
        </div>
      </section>
    </div>
  )
}

export default AboutPage
