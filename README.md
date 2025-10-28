# Vubber Web

A modern, feature-rich web application built with React and TypeScript, leveraging cutting-edge technologies for a robust frontend experience.

## 🚀 Tech Stack

### Core Technologies
- **React 18.3.1** - Latest version of the popular UI library
- **TypeScript 5.5.3** - For type-safe code and better developer experience
- **Vite 5.4.1** - Next-generation frontend tooling for faster development and builds

### State Management & Data Fetching
- **Redux Toolkit 2.8.2** - For efficient global state management
- **TanStack Query 5.56.2** - For powerful server state management and data fetching
- **Redux Persist 6.0.0** - For persistent state storage
- **Axios 1.9.0** - For HTTP requests

### UI Components & Styling
- **shadcn/ui** - A collection of beautifully designed, accessible components
- **Radix UI** - Unstyled, accessible components for building high-quality design systems
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 11.15.0** - For smooth animations and transitions
- **Lucide React 0.515.0** - Beautiful, consistent icon set
- **Sonner 2.0.5** - Modern toast notifications
- **React Day Picker 9.7.0** - Flexible date picker component
- **Embla Carousel 8.6.0** - Extensible carousel/slider
- **React Joyride 2.9.3** - Product tours and walkthroughs
- **React Image Crop 11.0.7** - Image cropping functionality
- **Vaul 1.1.2** - Drawer component

### Forms & Validation
- **React Hook Form 7.57.0** - For efficient form handling
- **Zod 3.25.64** - TypeScript-first schema validation
- **React Multi Email 1.0.25** - Email input handling
- **Input OTP 1.4.2** - One-time password input component

### Data Visualization
- **Recharts 2.15.3** - Composable charting library

### Development Tools
- **ESLint 9.9.0** - Code linting
- **TypeScript ESLint 8.0.1** - TypeScript-specific linting
- **Tailwind Typography 0.5.15** - Beautiful typography defaults
- **PostCSS 8.4.47** - CSS transformation tool
- **Autoprefixer 10.4.20** - Automatic CSS prefixing

## 📁 Project Structure

```
vubber-web/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   │   ├── auth/    # Authentication components
│   │   ├── blog/    # Blog-related components
│   │   ├── landing/ # Landing page components
│   │   └── ui/      # ShadCN UI components
│   ├── pages/       # Application pages/routes
│   ├── shared/      # Shared utilities and layouts
│   │   ├── layout/  # Layout components
│   │   └── services/# API services and utilities
│   ├── store/       # Redux store configuration
│   │   └── slices/  # Redux slices
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Utility functions
└── terraform/       # Infrastructure as Code
```

## 🚦 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd vubber-web
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Start development server**
```bash
npm run dev
# or
bun run dev
```

4. **Build for production**
```bash
npm run build
# or
bun run build
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
# API Configuration

VITE_API_URL=your_api_url_here
```
