# PARADOX // Modern Design Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity CMS](https://img.shields.io/badge/Sanity_CMS_v5-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP_3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel_Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-red?style=for-the-badge)

<br />

**A high-impact, brutalist digital design portfolio & interactive laboratory built for the modern web.**

[Explore Live Site](https://github.com/someshwarx/design_portfolio) • [Key Features](#-core-features--interactive-experiences) • [Pages](#-page-architecture) • [Tech Stack](#-tech-stack--creative-arsenal) • [Local Setup](#-getting-started) • [Sanity Studio](#-sanity-studio-cms)

---

</div>

## 👁️ Overview

**PARADOX** is a production-grade, immersive design portfolio created by **Someshwar** (aka *PARADOX*). It acts as a curated archive of visual experiments, brand identities, digital worlds, and interactive web graphics.

Designed at the intersection of **brutalism and contemporary elegance**, the portfolio rejects generic templates in favor of bespoke typography, kinetic micro-interactions, custom WebGL physics, and real-time headless content management.

> *"Balancing opposites. Structure and chaos. Logic and emotion. If it feels bold or unfamiliar, there is intent behind it."*

---

## ⚡ Core Features & Interactive Experiences

### 🌌 WebGL Fluid Silk Shader Canvas
- Powered by [OGL](https://github.com/oframe/ogl), rendering an interactive, mathematically calculated fluid silk fabric mesh directly on the canvas.
- Features dynamic cursor-reactive disturbance, undulating ambient wave motions, and smooth rendering across desktop and mobile devices.

### 🎮 The Tap Lab ("Box Buster")
- A built-in 30-second reflex arcade experience located at `/lab`.
- Fast-paced target-clearing mechanics with real-time combo multipliers, streak tracking, interactive sound triggers, and high-score persistence.

### 🔠 Kinetic & Brutalist Typography
- Custom type hierarchy combining **Syne**, **Space Grotesk**, **Outfit**, and **Geist Mono**.
- **Cyberpunk Scramble Effects**: Terminal-style character scramble transitions (`HyperText` and `HoverScrambleText`) on titles and interactive triggers.
- **GSAP ScrollTrigger Timelines**: Staggered text reveals, skew animations, and magnetic header typography.

### 🎛️ Headless CMS with Sanity Studio
- Integrated Sanity Studio accessible at `/studio` for zero-friction content management.
- Dynamic project schemas featuring categories (Automotive, Game Art, Architecture, Abstract, Sports, Typography, Portraits, etc.).
- Responsive grid sizing (`small 1x1`, `medium tall 1x2`, `large 2x2`) with aspect ratio preservation and automatic WebP image optimization.

### 🧭 Precision Micro-Interactions & Navigational Systems
- **Custom Magnetic Cursor**: Adaptive cursor that expands, locks onto interactive targets, and switches blend modes seamlessly.
- **Staggered Multi-Layer Fullscreen Menu**: Cinematic overlay menu with staggered drawer panels and dynamic color shifts.
- **Parallax Sticky Footer**: Deep-layered parallax reveal featuring real-time IST (Asia/Kolkata) digital clock and geographic coordinates (`12.9629° N, 77.5775° E`).
- **Lenis Smooth Scroll**: Inertial, momentum-based scrolling for consistent kinetic motion.
- **Ambient Audio Integration**: Custom soundscapes and audio player component for sensory immersion.
- **Developer Console Easter Egg**: Bespoke ASCII art and message logged to the browser developer console.

---

## 🗺️ Page Architecture

| Route | Page | Purpose & Experience |
| :--- | :--- | :--- |
| `/` | **Home / Index** | Massive hero header, OGL silk canvas, curated work showcases, interactive manifesto, tools showcase, and high-contrast contact CTA. |
| `/about` | **About / Philosophy** | In-depth designer dossier, exploration of "Digital Chaos", design principles, skills matrix, and direct collaboration access. |
| `/designs` | **Designs Archive** | Dynamic masonry grid connected to Sanity CMS with category filtering, lightbox zoom, and custom project color accents. |
| `/lab` | **The Tap Lab** | Interactive 30-second reflex challenge game (*Box Buster*) testing speed, precision, and focus. |
| `/works` | **Case Studies** | In-depth retrospective breakdowns covering strategic thinking, UX workflows, and system designs. |
| `/studio` | **Sanity Studio** | Embedded headless studio for creating, editing, and publishing portfolio entries in real time. |

---

## 🛠️ Tech Stack & Creative Arsenal

### Frontend & Core Engine
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components & Streaming)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom tokens & `@tailwindcss/postcss`
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Simple Icons](https://simpleicons.org/)

### Motion & Creative Computing
- **Animations**: [GSAP](https://gsap.com/) (GreenSock) + `ScrollTrigger` + `@gsap/react`
- **Component Motion**: [Framer Motion / Motion](https://www.framer.com/motion/)
- **WebGL / Shaders**: [OGL](https://github.com/oframe/ogl) (Minimal WebGL library)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)

### Content & Asset Infrastructure
- **CMS**: [Sanity v5](https://www.sanity.io/) (`next-sanity`, `@sanity/image-url`, `@sanity/icons`)
- **Deployment**: [Vercel](https://vercel.com/) (Edge Network, CI/CD, Serverless)

### Creative Software Stack
- **Interface Design**: Figma
- **3D Modeling & Motion**: Blender, Spline
- **Production & Vectors**: Adobe Creative Cloud, Affinity Suite
- **Prototyping**: Framer

---

## 📁 Project Structure

```bash
design_portfolio/
├── public/                     # Static assets (logos, video loops, icons)
│   ├── tools/                  # Software arsenal badges (Figma, Blender, etc.)
│   └── videos/                 # Background video textures
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # /about route
│   │   ├── designs/            # /designs dynamic gallery route
│   │   ├── lab/                # /lab interactive Box Buster game
│   │   ├── studio/             # /studio embedded Sanity CMS
│   │   ├── works/              # /works case studies
│   │   ├── globals.css         # Global design tokens, animations, brutalist styles
│   │   ├── layout.tsx          # Root layout with preloader, cursor, lenis & sticky footer
│   │   └── page.tsx            # Portfolio index page
│   ├── components/
│   │   ├── animations/         # WebGL SilkBackground, PageTransitions, FadeIn
│   │   ├── lab/                # BoxBusterGame mechanics & UI
│   │   ├── layout/             # Header, Footer, FooterWrapper, SmoothScroll
│   │   ├── sections/           # Hero, FeaturedWorks, Manifesto, ToolsGrid, WorksGrid
│   │   └── ui/                 # StaggeredMenu, CustomCursor, Preloader, Marquee, etc.
│   ├── contexts/               # React contexts & global states
│   ├── hooks/                  # Custom hooks (audio, animations, viewport)
│   ├── lib/                    # Helper functions & utility methods (cn, formatting)
│   ├── sanity/                 # Sanity client, schema definitions, GROQ queries
│   ├── styles/                 # Custom font definitions (Syne, Space Grotesk, Outfit)
│   └── types/                  # TypeScript interface definitions (Project, etc.)
├── sanity.config.ts            # Sanity Studio configuration
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- **Node.js**: v20.x or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 1. Clone & Install

```bash
git clone https://github.com/someshwarx/design_portfolio.git
cd design_portfolio
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

> **Note**: If Sanity credentials are not supplied, the application will gracefully fall back to pre-configured mock projects so you can preview the UI instantly.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Sanity Studio CMS

Manage your live works, categories, project metadata, and image assets without redeploying code:

1. Run the local dev server (`npm run dev`).
2. Navigate to [http://localhost:3000/studio](http://localhost:3000/studio).
3. Log in with your Sanity credentials to publish or edit projects.

### Project Schema Structure
- **`title`** *(string)*: Project title.
- **`slug`** *(slug)*: URL slug auto-generated from title.
- **`category`** *(select)*: Automotive, Game Art, Architecture, Abstract, Typography, Sports, etc.
- **`hexColor`** *(string)*: Custom accent hex code for card hover and background glowing.
- **`size`** *(radio)*: Small (1x1), Medium (1x2), Large (2x2) masonry layout.
- **`mainImage`** *(image)*: High-res artwork with hotspot cropping.

---

## ☁️ Deployment

This project is optimized for deployment on **[Vercel](https://vercel.com/)**:

1. Fork or push this repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Configure the environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).
4. Deploy! Vercel automatically handles incremental builds and edge caching.

---

## 👨‍💻 Creator & Connect

**SOMESHWAR (PARADOX)**
*Visual Designer & Creative Developer*

- 🌐 **Portfolio**: [someshwarx/design_portfolio](https://github.com/someshwarx/design_portfolio)
- 📸 **Instagram**: [@paradox.x0](https://www.instagram.com/paradox.x0/)
- 🐦 **X / Twitter**: [@somesh__x1](https://x.com/somesh__x1)
- ✉️ **Email**: [someshwark22@gmail.com](mailto:someshwark22@gmail.com)

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
