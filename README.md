<div align="center">

# 🌟 Sultan Ayat Khan - Personal Portfolio

*A Modern, Full-Featured Portfolio & Professional Dashboard*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**[🚀 Live Demo](https://sultan-personal-portfolio-islamic.vercel.app/)** • **[📧 Get in Touch](#contact)** • **[📖 Documentation](#documentation)**

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [📖 Usage & Components](#-usage--components)
- [🎨 Customization](#-customization)
- [🚀 Deployment](#-deployment)
- [📝 Available Scripts](#-available-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📧 Contact](#-contact)

---

## 🌐 Live Demo

🎉 **The portfolio is now live!** Visit the live deployment:

**👉 [https://sultan-personal-portfolio-islamic.vercel.app/](https://sultan-personal-portfolio-islamic.vercel.app/)**

---

## Overview

A sophisticated, modern personal portfolio website built with cutting-edge web technologies. This portfolio showcases professional work, provides interactive features like appointment scheduling, secure payment processing, and a comprehensive protocol dashboard. Perfect for professionals, consultants, and freelancers who want to make a strong online presence.

**Key Highlights:**
- 🎯 Fully responsive design that works on all devices
- ⚡ Lightning-fast performance with Next.js 15
- 🎨 Beautiful UI components with Tailwind CSS
- 📱 Mobile-optimized interface
- 🔒 Secure payment integration (Piprapay)
- 📅 Interactive calendar and appointment scheduling
- 🌈 Customizable Islamic patterns and themes
- ♿ Accessibility-first approach

---

## ✨ Features

### 🌐 Core Features
- **Portfolio Showcase** - Display your work, projects, and achievements beautifully
- **About Section** - Tell your story with engaging content
- **Contact Form** - Professional contact form with validation
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 📅 Appointment System
- Interactive calendar widget
- Easy appointment booking
- Date/time selection interface
- Integration-ready for scheduling backends

### 💳 Payment Integration
- Secure payment processing via Piprapay
- Professional payment form with validation
- Multiple payment method support
- Transaction security features

### 📊 Protocol Dashboard
- Comprehensive protocol management system
- Data visualization and analytics
- Professional dashboard interface
- Real-time updates

### 🎨 Design Features
- **Islamic Patterns** - Beautiful geometric pattern customizer
- **Theme Customization** - Dark/light mode support
- **Modern UI** - Sleek, professional components
- **Animation** - Smooth transitions and interactions

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org)** - React framework for production
- **[React 19](https://react.dev)** - UI library
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com)** - High-quality UI components
- **[React Hook Form](https://react-hook-form.com)** - Performant forms
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

### UI Components & Tools
- **[Sonner](https://sonner.emilkowal.ski)** - Toast notifications
- **[React Big Calendar](https://react-big-calendar.js.org)** - Calendar component
- **[Recharts](https://recharts.org)** - Charts and visualizations
- **[Framer Motion](https://www.framer.com/motion)** - Animations

### Development Tools
- **[pnpm](https://pnpm.io)** - Fast package manager
- **[PostCSS](https://postcss.org)** - CSS processor
- **[ESLint](https://eslint.org)** - Code linting
- **[TypeScript Compiler](https://www.typescriptlang.org)** - Type checking

### Deployment
- **[Vercel](https://vercel.com)** - Hosting and deployment

---

## 📁 Project Structure

```
sultan-personal-portfolio/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── actions/
│   │   └── piprapay.ts          # Payment processing logic
│   ├── calendar/
│   │   └── page.tsx             # Calendar/appointment page
│   └── protocol/
│       └── page.tsx             # Protocol dashboard
├── components/                  # Reusable components
│   ├── appointment-calendar.tsx # Calendar widget
│   ├── contact-form.tsx         # Contact form
│   ├── islamic-patterns.tsx     # Pattern display
│   ├── pattern-customizer.tsx   # Pattern customizer
│   ├── payment-form.tsx         # Payment form
│   ├── protocol-dashboard.tsx   # Dashboard
│   ├── theme-provider.tsx       # Theme context
│   └── ui/                      # Shadcn UI components
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── table.tsx
│       └── ... (and more)
├── hooks/                       # Custom React hooks
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notification hook
├── lib/
│   └── utils.ts                # Utility functions
├── public/                      # Static assets
├── styles/                      # Global styles
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** 18.17+ or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Moparapairayat/sultan-personal-Portfolio.git
   cd sultan-personal-Portfolio
   ```

2. **Install dependencies** (using pnpm)
   ```bash
   pnpm install
   ```

   Or using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

### Running Locally

1. **Start the development server**
   ```bash
   pnpm dev
   ```

   Or using npm:
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Start editing**
   - Open `app/page.tsx` to modify the home page
   - Changes auto-refresh in the browser

---

## 📖 Usage & Components

### Main Pages

#### Home Page (`app/page.tsx`)
The landing page featuring portfolio overview, hero section, and featured work.

#### Calendar Page (`app/calendar/page.tsx`)
Interactive appointment scheduling system with:
- Calendar widget for date selection
- Time slot availability
- Appointment confirmation

#### Protocol Dashboard (`app/protocol/page.tsx`)
Professional dashboard for protocol management with:
- Data visualization
- Performance metrics
- Status tracking

### Key Components

#### Contact Form
```tsx
<ContactForm />
```
Professional contact form with validation and submission handling.

#### Payment Form
```tsx
<PaymentForm />
```
Secure payment processing interface for Piprapay integration.

#### Appointment Calendar
```tsx
<AppointmentCalendar />
```
Interactive calendar for booking appointments.

#### Islamic Patterns
```tsx
<IslamicPatterns />
<PatternCustomizer />
```
Beautiful geometric patterns with customization options.

---

## 🎨 Customization

### Update Theme
Edit `tailwind.config.ts` to customize:
- Color palette
- Typography
- Spacing
- Breakpoints

### Modify Components
All components use Shadcn UI and Tailwind CSS for easy customization:
- Edit component files in `components/` directory
- Update styles in component files or global CSS

### Add New Pages
1. Create a new folder in `app/`
2. Add `page.tsx` file
3. Next.js automatically creates the route

### Environment Variables
Create a `.env.local` file for sensitive configuration:
```env
NEXT_PUBLIC_PIPRAPAY_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js configuration

3. **Deploy**
   - Click "Deploy"
   - Your site is live!

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=.next
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server (localhost:3000) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm type-check` | Run TypeScript type checking |

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/sultan-personal-Portfolio.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary

4. **Commit your changes**
   ```bash
   git commit -m "Add some amazing feature"
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues

### Code Style
- Use TypeScript for type safety
- Follow ESLint rules
- Keep components small and focused
- Use meaningful variable names

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**You are free to:**
- ✅ Use this project personally or commercially
- ✅ Modify and adapt the code
- ✅ Distribute your own versions

**You must:**
- 📋 Include the license and copyright notice

---

## 📧 Contact

Have questions or want to collaborate? Reach out!

- **Email:** [your-email@example.com](mailto:Support@moparapairayat.uk) 
- **Website:** [https://your-portfolio.com](https://your-portfolio.com)
- **GitHub:** [Moparapairayat](https://github.com/Moparapairayat)
- **LinkedIn:** [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star!

**Made with ❤️ by MOPARA PAIR AYAT**

[Back to Top](#sultan-ayat-khan---personal-portfolio)

</div>
