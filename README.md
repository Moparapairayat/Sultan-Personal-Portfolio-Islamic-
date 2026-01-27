<div align="center">

<img src="https://img.shields.io/badge/Sultan%20Ayat%20Khan-Personal%20Portfolio-black?style=for-the-badge&logo=portfolio&logoColor=gold" alt="Sultan Portfolio">

# 🌟 Sultan Ayat Khan - Personal Portfolio

> **A Modern, Full-Featured Portfolio & Professional Dashboard** built with Next.js 15, React 19, and Tailwind CSS

<br/>

<!-- Badges Section -->
<div>
  
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](./LICENSE)
[![Status Active](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://github.com/Moparapairayat)

</div>

<br/>

<!-- Quick Links -->
<div>
  
### 🚀 [Live Demo](https://sultan-personal-portfolio-islamic.vercel.app/) • 📧 [Contact](#-contact) • 💻 [View Source](#-getting-started)

</div>

---

</div>

## 📋 Table of Contents

<table>
<tr>
<td valign="top">

- [🌐 Live Demo](#-live-demo)
- [📖 Overview](#overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)

</td>
<td valign="top">

- [🚀 Getting Started](#-getting-started)
- [📖 Usage & Components](#-usage--components)
- [🎨 Customization](#-customization)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📧 Contact](#-contact)

</td>
</tr>
</table>

---

## 🌐 Live Demo

<div align="center">

### 🎉 **The Portfolio is NOW LIVE!**

#### 👉 **[Visit: sultan-personal-portfolio-islamic.vercel.app](https://sultan-personal-portfolio-islamic.vercel.app/)**

Experience the full interactive portfolio with:
- ⚡ **Lightning-fast** performance (Lighthouse score: 95+)
- 📱 **Fully responsive** on all devices
- 🎨 **Beautiful animations** and transitions
- ♿ **Accessibility-first** design

</div>

---

## 📖 Overview

A **sophisticated, modern personal portfolio website** showcasing professional work, interactive features, and comprehensive management systems. Built for professionals, consultants, and freelancers who demand excellence in their online presence.

### ✅ What Makes This Special

| Feature | Benefit |
|---------|---------|
| 🎯 **Fully Responsive** | Works seamlessly on mobile, tablet, and desktop |
| ⚡ **Next.js 15 + Turbopack** | Fastest build times and instant page loads |
| 🎨 **Tailwind CSS** | Beautiful, customizable, modern styling |
| 🔒 **Secure Payment Integration** | Piprapay payment processing built-in |
| 📅 **Smart Calendar System** | Appointment scheduling with date/time selection |
| 🌈 **Islamic Pattern Design** | Unique geometric patterns with customization |
| 📊 **Admin Dashboard** | Protocol management and analytics |
| ✨ **Smooth Animations** | Framer Motion-powered transitions |

---

## ✨ Features

### 🌐 **Core Features**
- 🎭 **Portfolio Showcase** - Display work, projects, and achievements beautifully
- 📝 **About Section** - Engaging biography and background
- 📧 **Contact Form** - Professional form with validation and submission handling
- 📱 **Responsive Design** - Flawless experience on all screen sizes

### 📅 **Appointment System**
- 📆 Interactive calendar widget with date selection
- ⏰ Real-time availability and time slot selection
- ✅ Appointment confirmation and notifications
- 🔗 Integration-ready for scheduling backends

### 💳 **Payment Integration**
- 🛡️ Secure Piprapay payment processing
- 💰 Multiple payment method support
- 📋 Professional payment form with validation
- 🔐 Transaction security and SSL encryption

### 📊 **Protocol Dashboard**
- 📈 Comprehensive data visualization
- 📊 Real-time analytics and performance metrics
- 🎯 Status tracking and reporting
- 🔄 Real-time updates and notifications

### 🎨 **Design Features**
- 🕌 **Islamic Patterns** - Geometric pattern customizer with animation
- 🌓 **Theme Switching** - Dark/Light mode support
- ✨ **Modern UI** - Sleek, professional Shadcn components
- 🎬 **Smooth Animations** - Micro-interactions and transitions

---

## 🛠️ Tech Stack

<details open>
<summary><b>Click to expand Tech Stack Details</b></summary>

### Frontend Framework & Build
```
Next.js 15 (React Framework with Turbopack)
├── React 19 (UI Library)
├── TypeScript 5 (Type Safety)
├── Tailwind CSS 3.4 (Styling)
└── PostCSS (CSS Processing)
```

### UI & Components
```
Component Library
├── Shadcn/UI (Radix UI + Tailwind)
├── Lucide React (Icons)
├── Sonner (Toast Notifications)
├── React Day Picker (Calendar)
├── Recharts (Data Visualization)
└── Embla Carousel (Carousels)
```

### Forms & Validation
```
Form Management
├── React Hook Form (Efficient Forms)
├── Zod (Schema Validation)
└── @hookform/resolvers (Integration)
```

### Animations & Effects
```
Animation Library
├── Framer Motion (Advanced Animations)
├── Tailwind CSS Animate (Built-in Animations)
└── CSS Transitions (Native Effects)
```

### Development Tools
```
Build & Quality
├── pnpm (Fast Package Manager)
├── ESLint (Code Linting)
├── TypeScript Compiler (Type Checking)
├── Tailwind CSS IntelliSense
└── VS Code Extensions
```

### Deployment
```
Hosting & CDN
├── Vercel (Primary Hosting)
├── Vercel Analytics (Performance Monitoring)
├── Edge Network (Global CDN)
└── Automatic CI/CD
```

</details>

---

## 📁 Project Structure

```
sultan-personal-portfolio/
│
├── 📂 app/                          # Next.js App Router
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Home page (main portfolio)
│   ├── globals.css                  # Global styles
│   ├── 📂 actions/                  # Server actions
│   │   └── piprapay.ts              # Payment processing
│   ├── 📂 calendar/                 # Calendar page
│   │   └── page.tsx                 # Appointment calendar
│   └── 📂 protocol/                 # Protocol page
│       └── page.tsx                 # Admin dashboard
│
├── 📂 components/                   # React Components
│   ├── appointment-calendar.tsx     # Calendar widget
│   ├── contact-form.tsx             # Contact form
│   ├── islamic-patterns.tsx         # Pattern renderer
│   ├── pattern-customizer.tsx       # Pattern editor
│   ├── payment-form.tsx             # Payment form
│   ├── protocol-dashboard.tsx       # Dashboard UI
│   ├── theme-provider.tsx           # Theme context
│   └── 📂 ui/                       # Shadcn UI Components
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── dialog.tsx
│       ├── calendar.tsx
│       └── ... (30+ components)
│
├── 📂 hooks/                        # Custom React Hooks
│   ├── use-mobile.tsx               # Mobile detection
│   └── use-toast.ts                 # Toast notifications
│
├── 📂 lib/                          # Utilities
│   └── utils.ts                     # Helper functions
│
├── 📂 public/                       # Static assets
│   └── ... (images, fonts, etc.)
│
├── 📂 styles/                       # Global styles
│   └── globals.css                  # Base styles
│
├── 📋 Configuration Files
│   ├── tailwind.config.ts           # Tailwind configuration
│   ├── tsconfig.json                # TypeScript config
│   ├── next.config.mjs              # Next.js config
│   ├── postcss.config.mjs           # PostCSS config
│   └── package.json                 # Dependencies
│
└── 📄 Documentation
    ├── README.md                    # You are here
    └── LICENSE                      # MIT License
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Before you begin, ensure you have installed:

```bash
✅ Node.js 18.17+ (or higher)
✅ npm / yarn / pnpm / bun
✅ Git
```

Check versions:
```bash
node --version   # v18.17.0+
npm --version    # 9.0.0+
```

### 🔧 Installation

**Step 1: Clone the Repository**
```bash
git clone https://github.com/Moparapairayat/Sultan-Personal-Portfolio-Islamic-.git
cd Sultan-Personal-Portfolio-Islamic-
```

**Step 2: Install Dependencies**
```bash
pnpm install
```
Or with npm:
```bash
npm install
```

**Step 3: Configure Environment (Optional)**
```bash
# Create .env.local file
cp .env.example .env.local

# Add your configuration
NEXT_PUBLIC_PIPRAPAY_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

### ▶️ Running Locally

**Start Development Server:**
```bash
pnpm dev
```

**Output:**
```
  ▲ Next.js 15.2.4 (Turbopack)
  - Local:         http://localhost:3000
  ✓ Ready in 2.1s
```

**Navigate to:** [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage & Components

### 🏠 Main Pages

#### Home Page (`app/page.tsx`)
Main landing page featuring:
- Hero section with introduction
- Royal Achievements section with animations
- Biography and background
- Education timeline
- Expertise areas
- Contact section

#### 📅 Calendar Page (`app/calendar/page.tsx`)
Appointment booking system with:
- Interactive calendar widget
- Date and time selection
- Real-time availability
- Appointment confirmation

#### 📊 Protocol Dashboard (`app/protocol/page.tsx`)
Admin dashboard featuring:
- Data visualization and charts
- Performance metrics
- Status tracking
- Analytics and reporting

### 🧩 Component Examples

**Using Contact Form:**
```tsx
import { ContactForm } from '@/components/contact-form'

export default function Page() {
  return <ContactForm />
}
```

**Using Appointment Calendar:**
```tsx
import { AppointmentCalendar } from '@/components/appointment-calendar'

export default function Page() {
  return <AppointmentCalendar />
}
```

**Using Islamic Patterns:**
```tsx
import { IslamicPatterns, PatternCustomizer } from '@/components/islamic-patterns'

export default function Page() {
  return (
    <>
      <IslamicPatterns animate={true} />
      <PatternCustomizer />
    </>
  )
}
```

---

## 🎨 Customization

### 🎯 Themes & Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    accent: '#your-color',
  },
  extend: {
    // Customize further
  }
}
```

### 📝 Content Customization

Edit `app/page.tsx` to modify:
- Portfolio title and description
- About section content
- Achievements list
- Education entries
- Contact information

### 🎬 Animation Settings

Toggle animations in the pattern settings:
```tsx
// Control animation intensity
patternSettings.animate = true
patternSettings.intensity = 0.5
```

### ➕ Add New Pages

1. **Create page folder:**
   ```bash
   mkdir -p app/my-page
   touch app/my-page/page.tsx
   ```

2. **Create page component:**
   ```tsx
   export default function MyPage() {
     return <div>Your content</div>
   }
   ```

3. **Auto-routed:** Accessible at `/my-page`

---

## 🚀 Deployment

### ✅ Deploy to Vercel (Recommended)

**Easiest method - one-click deployment:**

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Vercel auto-detects Next.js

3. **Deploy**
   ```
   Click "Deploy"
   ✨ Your site is live!
   ```

### 📦 Other Deployment Options

**Netlify:**
```bash
npm run build
netlify deploy --prod
```

**Docker (Advanced):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## 📝 Available Scripts

| Command | Purpose | Usage |
|---------|---------|-------|
| `pnpm dev` | Start dev server | `pnpm dev` |
| `pnpm build` | Production build | `pnpm build` |
| `pnpm start` | Start production server | `pnpm start` |
| `pnpm lint` | Run ESLint | `pnpm lint` |
| `pnpm type-check` | TypeScript check | `pnpm type-check` |

---

## 🤝 Contributing

We welcome contributions! Follow these steps:

**Step 1: Fork Repository**
```bash
# Go to GitHub and fork the repo
git clone https://github.com/YOUR_USERNAME/Sultan-Personal-Portfolio-Islamic-.git
```

**Step 2: Create Feature Branch**
```bash
git checkout -b feature/amazing-feature
```

**Step 3: Make Changes**
- Write clean, well-documented code
- Follow TypeScript strict mode
- Add comments for complex logic

**Step 4: Commit Changes**
```bash
git commit -m "feat: add amazing feature"
```

**Step 5: Push & Create PR**
```bash
git push origin feature/amazing-feature
# Open Pull Request on GitHub
```

### 📏 Code Guidelines
- ✅ Use TypeScript for type safety
- ✅ Follow ESLint configuration
- ✅ Keep components focused and reusable
- ✅ Add JSDoc comments for public functions
- ✅ Write meaningful commit messages

---

## 📄 License

Licensed under the **MIT License** - see [LICENSE](./LICENSE) file for details.

### Permission Granted ✅
- Use commercially
- Modify the code
- Distribute copies
- Private use

### Conditions Required 📋
- Include license notice
- State changes made

---

## 📧 Contact

<div align="center">

### 🌍 Let's Connect Globally!

**Get in touch across different regions:**

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:Support@moparapairayat.com)
[![Global Website](https://img.shields.io/badge/🌍%20Global-moparapairayat.com-000000?style=for-the-badge)](https://moparapairayat.com)
[![UK Website](https://img.shields.io/badge/🇬🇧%20UK-moparapairayat.uk-000000?style=for-the-badge)](https://moparapairayat.uk)
[![BD Website](https://img.shields.io/badge/🇧🇩%20Bangladesh-moparapairayat.bd-000000?style=for-the-badge)](https://moparapairayat.bd)
[![TR Website](https://img.shields.io/badge/🇹🇷%20Turkey-moparapairayat.tr-000000?style=for-the-badge)](https://moparapairayat.tr)

---

### 📍 Regional Websites

| Region | Website | Use Case |
|--------|---------|----------|
| 🌍 **Global** | [moparapairayat.com](https://moparapairayat.com) | International clients & worldwide reach |
| 🇬🇧 **United Kingdom** | [moparapairayat.uk](https://moparapairayat.uk) | UK-based services & clients |
| 🇧🇩 **Bangladesh** | [moparapairayat.bd](https://moparapairayat.bd) | Bangladesh operations & regional services |
| 🇹🇷 **Turkey** | [moparapairayat.tr](https://moparapairayat.tr) | Turkey-based services & Middle East reach |

---

### 🔗 Quick Links

| Platform | Link |
|----------|------|
| 📧 **Email** | [Support@moparapairayat.com](mailto:Support@moparapairayat.com) |
| 🌐 **Portfolio** | [sultan-personal-portfolio-islamic.vercel.app](https://sultan-personal-portfolio-islamic.vercel.app/) |
| 💼 **GitHub** | [Moparapairayat](https://github.com/Moparapairayat) |
| 🔗 **LinkedIn** | [LinkedIn Profile](https://linkedin.com/in/your-profile) |

---

### 📞 Contact Methods

Choose the region that best serves you:

**For Global Inquiries:**
- Visit: [moparapairayat.com](https://moparapairayat.com)
- Email: [Support@moparapairayat.com](mailto:Support@moparapairayat.com)

**For UK Clients:**
- Visit: [moparapairayat.uk](https://moparapairayat.uk)
- Email: [Support@moparapairayat.uk](mailto:Support@moparapairayat.uk)

**For Bangladesh Operations:**
- Visit: [moparapairayat.bd](https://moparapairayat.bd)
- Email: [Support@moparapairayat.bd](mailto:Support@moparapairayat.bd)

**For Turkey & Middle East:**
- Visit: [moparapairayat.tr](https://moparapairayat.tr)
- Email: [Support@moparapairayat.tr](mailto:Support@moparapairayat.tr)

---

### 📧 Official Contract & Business Email

Always Active Email Addresses for Contract & Business Inquiries:

| Email | Purpose |
|-------|---------|
| 📧 [Moparapairayat@gmail.com](mailto:Moparapairayat@gmail.com) | General Contract & Business Inquiry |
| 📧 [Moparapairayatbd@gmail.com](mailto:Moparapairayatbd@gmail.com) | Bangladesh & Regional Business Inquiry |

---

### 💬 WhatsApp Contact Numbers

Direct WhatsApp for Project Inquiries:

| WhatsApp | Purpose |
|----------|---------|
| 📱 [+1 724-315-5810](https://wa.me/17243155810) | Personal Project Inquiry |
| 📱 [+1 719-680-2913](https://wa.me/17196802913) | Corporate/Business Large Project Inquiry |
| 📱 [+8801955000704](https://wa.me/8801955000704) | ML & AML Project Inquiry |
| 📱 [+8801305868621](https://wa.me/8801305868621) | Security & Server Related Project Inquiry |

</div>

---

<div align="center">

## 🌟 Show Your Support

If you found this project helpful, please consider:
- ⭐ Giving it a star on GitHub
- 📤 Sharing it with your network
- 🐛 Reporting bugs and issues
- 💡 Suggesting improvements

### Made with ❤️ by Sultan Ayat Khan

---

**[⬆ Back to Top](#sultan-ayat-khan---personal-portfolio)**

</div>
