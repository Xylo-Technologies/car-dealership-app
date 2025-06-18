# Elite Motors - Premium Car Dealership Frontend

A modern, responsive car dealership website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Premium Design**: Deep Blue (#1E3A8A) and Gold (#D4AF37) color scheme with Poppins font
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Carousel, search with autocomplete, hover effects
- **Advanced Search**: Comprehensive filtering and sorting capabilities
- **Car Detail Pages**: Detailed vehicle information with image galleries
- **Contact Forms**: React Hook Form with validation
- **About Us**: Company history, team profiles, and customer testimonials
- **Contact Page**: Multiple contact methods with social media integration
- **Admin Portal**: Complete admin functionality for inventory and lead management
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML
- **Performance Optimized**: Next.js Image optimization, lazy loading, and smooth animations
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Images**: Unsplash integration for team photos
- **Font**: Poppins (Google Fonts)
- **Authentication**: Mock authentication system for admin portal

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

5. **Access Admin Portal**
   Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
   - Email: admin@elitemotors.com
   - Password: admin123

## 🏗️ Project Structure

\`\`\`
elite-motors/
├── app/
│   ├── about/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── cars/[id]/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── search/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   └── slider.tsx
│   ├── AdminSidebar.tsx
│   ├── CarCard.tsx
│   ├── ContactForm.tsx
│   ├── FeaturedCars.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── InventoryTab.tsx
│   ├── LeadsTab.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   └── SearchFilters.tsx
├── data/
│   ├── cars.json
│   └── leads.json
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

### About Us (/about)
- Hero section with company mission
- Company history and values
- Team member profiles with professional headshots
- Customer testimonials with star ratings
- Interactive Google Maps showroom location
- Mission statement and core values

### Contact (/contact)
- Comprehensive contact form with validation
- Multiple contact methods (phone, email, address)
- Business hours and location information
- Social media links (Facebook, Instagram, TikTok)
- Interactive Google Maps integration
- Floating WhatsApp contact button

### Admin Login (/admin/login)
- Secure login form with email/password validation
- Multi-factor authentication toggle (mocked)
- Forgot password functionality (mocked)
- Demo credentials provided for testing
- Deep Blue background with Gold accent buttons

### Admin Dashboard (/admin)
- Collapsible sidebar navigation
- Inventory management with full CRUD operations
- Lead management with filtering and response system
- Analytics and Settings placeholders for future features
- Responsive design with mobile-friendly navigation

## 🔐 Admin Features

### Authentication
- Mock authentication system
- MFA support (demonstration)
- Session management with localStorage
- Secure form handling with validation

### Inventory Management
- Complete vehicle CRUD operations
- Dynamic specification system (add/remove custom specs)
- Feature management with tags
- Mock image upload functionality
- Comprehensive form validation
- Real-time table updates

### Lead Management
- Customer inquiry tracking
- Source and status filtering
- Response system with history
- CSV export functionality
- Lead detail modal with full conversation history
- Status management (New, Contacted, Qualified, Converted, Lost)

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
- Alt text for all images
- Proper heading hierarchy
- Admin portal accessibility compliance

## 🚀 Performance Optimizations

- Next.js Image component with lazy loading
- Optimized font loading with next/font
- CSS animations with hardware acceleration
- Efficient bundle splitting
- Compressed assets
- Sticky positioning for better UX
- Optimized Unsplash image loading
- 1.5-second target load time
- Admin portal optimized for large datasets

## 📊 Data Management

### Dummy Data Structure
- **cars.json**: Vehicle inventory with detailed specifications
- **leads.json**: Customer inquiries with response history
- Dynamic filtering and sorting capabilities
- Mock data for realistic testing scenarios

### Admin Data Operations
- Real-time inventory updates
- Lead status management
- Response tracking and history
- Export functionality for reporting
- Form validation and error handling

## 🔧 Form Validation

All forms use React Hook Form with Zod schema validation:
- Required field validation
- Email format validation
- Phone number validation
- Minimum character requirements
- Real-time error feedback
- Success state handling
- Admin-specific validation rules

## 🗺️ Maps Integration

Google Maps embedded for dealership location with:
- Interactive map interface
- Dealership address and contact information
- Responsive iframe implementation
- Consistent styling across pages

## 📱 Social Media Integration

- Facebook, Instagram, and TikTok links
- Consistent branding and hover effects
- Accessible social media buttons
- WhatsApp floating action button

## 📞 Contact Information

- **Phone**: (555) 000-0000
- **Email**: info@elitemotors.com
- **Address**: 123 Main Street, Luxury District, LD 12345
- **WhatsApp**: Available via floating button
- **Admin Email**: admin@elitemotors.com

## 🔐 Admin Credentials

For testing the admin portal:
- **Email**: admin@elitemotors.com
- **Password**: admin123
- **MFA Code** (if enabled): 123456

## 🔮 Future Enhancements

- Backend integration for real data persistence
- User authentication and customer portal
- Advanced analytics dashboard
- Real-time notifications
- Email integration for lead responses
- Advanced reporting and insights
- Inventory alerts and notifications
- Customer relationship management (CRM)
- Financing calculator integration
- Virtual car tours
- Online appointment booking
- Live chat integration

## 📄 License

This project is proprietary and confidential.

---

**Elite Motors** - Experience luxury, performance, and excellence.
