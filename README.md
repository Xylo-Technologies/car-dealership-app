# Elite Motors - Premium Car Dealership Frontend

A modern, responsive car dealership website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Premium Design**: Deep Blue (#1E3A8A) and Gold (#D4AF37) color scheme with Poppins font
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Carousel, search with autocomplete, hover effects
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML
- **Performance Optimized**: Next.js Image optimization, lazy loading, and smooth animations
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
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
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CarCard.tsx
│   ├── FeaturedCars.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   └── SearchBar.tsx
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

## 🚀 Performance Optimizations

- Next.js Image component with lazy loading
- Optimized font loading
- CSS animations with hardware acceleration
- Efficient bundle splitting
- Compressed assets

## 📊 Dummy Data

The application uses mock data stored in `data/cars.json` including:
- Featured cars with specifications
- Search suggestions
- Price ranges and years

## 🔧 Customization

### Adding New Cars
Edit `data/cars.json` to add new vehicles to the featured cars section.

### Styling Changes
Modify `tailwind.config.ts` to update colors, fonts, or add new design tokens.

### Component Updates
All components are modular and can be easily modified or extended.

## 📞 Contact Information

- **Phone**: (555) 000-0000
- **Email**: info@elitemotors.com
- **Address**: 123 Main Street, Luxury District, LD 12345

## 🔮 Future Enhancements

- Backend integration for real car data
- User authentication and favorites
- Advanced search and filtering
- Online booking system
- Virtual car tours
- Customer reviews and ratings

## 📄 License

This project is proprietary and confidential.

---

**Elite Motors** - Experience luxury, performance, and excellence.
