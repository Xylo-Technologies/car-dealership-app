# Elite Motors - Premium Car Dealership Frontend

A modern, responsive car dealership website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Premium Design**: Deep Blue (#1E3A8A) and Gold (#D4AF37) color scheme with Poppins font
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Carousel, search with autocomplete, hover effects
- **Advanced Search**: Comprehensive filtering and sorting capabilities
- **Car Detail Pages**: Detailed vehicle information with image galleries
- **Contact Forms**: React Hook Form with validation
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML
- **Performance Optimized**: Next.js Image optimization, lazy loading, and smooth animations
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Font**: Poppins (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd elite-motors
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
elite-motors/
├── app/
│   ├── cars/[id]/
│   │   └── page.tsx
│   ├── search/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── slider.tsx
│   ├── CarCard.tsx
│   ├── ContactForm.tsx
│   ├── FeaturedCars.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   └── SearchFilters.tsx
├── data/
│   └── cars.json
├── public/
├── tailwind.config.ts
└── README.md
\`\`\`

## 🎨 Design System

### Colors
- **Deep Blue**: #1E3A8A (Primary brand color)
- **Gold**: #D4AF37 (Accent color)
- **White**: #FFFFFF
- **Dark Gray**: #1F2937
- **Light Gray**: #F3F4F6

### Typography
- **Font Family**: Poppins
- **Weights**: 300 (Light), 400 (Regular), 600 (Semibold), 700 (Bold)

### Components
- **Buttons**: Primary (Gold), Secondary (Deep Blue)
- **Cards**: White background with shadow and hover effects
- **Navigation**: Sticky header with smooth transitions

## 📱 Pages

### Homepage (/)
- Hero section with call-to-action
- Quick search functionality
- Featured vehicles carousel
- Contact information and social links

### Search (/search)
- Advanced filtering sidebar (price, make, model, year, condition, mileage, fuel type)
- Sortable results grid (3-column desktop, 2-column tablet, 1-column mobile)
- Pagination with 12 vehicles per page
- Responsive design with collapsible filters on mobile

### Car Detail (/cars/[id])
- Image carousel with thumbnail navigation
- Comprehensive vehicle specifications
- Contact form with validation
- Google Maps integration
- Call-to-action buttons (test drive, contact dealer, window sticker)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- High contrast colors
- Focus indicators
- Form validation with clear error messages

## 🚀 Performance Optimizations

- Next.js Image component with lazy loading
- Optimized font loading with next/font
- CSS animations with hardware acceleration
- Efficient bundle splitting
- Compressed assets
- Sticky positioning for better UX

## 📊 Dummy Data

The application uses mock data stored in `data/cars.json` including:
- Featured cars with detailed specifications
- Extended inventory for search functionality
- Search suggestions and filter options
- Vehicle images, features, and technical details

## 🔧 Form Validation

Contact forms use React Hook Form with Zod schema validation:
- Required field validation
- Email format validation
- Phone number validation
- Minimum character requirements
- Real-time error feedback

## 🗺️ Maps Integration

Google Maps embedded for dealership location with:
- Interactive map interface
- Dealership address and contact information
- Responsive iframe implementation

## 📞 Contact Information

- **Phone**: (555) 000-0000
- **Email**: info@elitemotors.com
- **Address**: 123 Main Street, Luxury District, LD 12345

## 🔮 Future Enhancements

- Backend integration for real car data
- User authentication and favorites
- Advanced search with more filters
- Online booking system
- Virtual car tours
- Customer reviews and ratings
- Financing calculator
- Trade-in valuation tool

## 📄 License

This project is proprietary and confidential.

---

**Elite Motors** - Experience luxury, performance, and excellence.
