🖋️ Kevin Inks

### Headless WordPress Portfolio for a Las Vegas Tattoo Artist

A premium tattoo portfolio and booking experience combining a custom React frontend with an easy-to-manage WordPress CMS.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?logo=wordpress&logoColor=white)](https://wordpress.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## 📖 About the Project

**Kevin Inks** is a custom portfolio and lead-generation website developed for a professional tattoo artist in Las Vegas, Nevada.

The website uses a dark fantasy-inspired editorial aesthetic, oversized typography, professional artwork, atmospheric effects, and smooth animations to create a premium visual experience.

Visitors can:

- Explore Kevin’s completed tattoo work
- Browse original available designs
- Learn about his creative process
- Read about his artistic philosophy
- View design availability and placement information
- Contact Kevin directly for a consultation
- Book through his preferred text-first workflow

The project uses a **headless WordPress architecture**. WordPress manages the website’s content, while React controls the public design, structure, animations, and user experience.

This allows Kevin to update his own text, images, portfolio pieces, and available designs without changing the website’s source code.

---

## 🎯 Business Goals

The website was designed to help Kevin:

- Build a stronger professional brand outside social media
- Convert Instagram followers into website visitors
- Display his tattoo portfolio professionally
- Promote original one-of-one tattoo designs
- Make text-based booking quick and accessible
- Capture interest from prospective clients
- Update website content without developer assistance
- Create a platform that can grow with his business

---

## ✨ Core Features

- 🎨 Premium dark editorial design
- 📱 Fully responsive mobile, tablet, and desktop layouts
- 🖼️ Interactive completed-work portfolio
- 💎 Original available-design gallery
- 🔍 Full-size artwork preview modals
- 🟢 Available, reserved, and exclusive design statuses
- 📏 Tattoo placement and sizing information
- 🧑‍🎨 Dedicated About Kevin section
- 🖋️ Artist philosophy and professional statistics
- 📖 Step-by-step client experience
- 💬 Text-first consultation buttons
- 📞 Direct phone-call actions
- 📸 Instagram and social-media integration
- 🧭 Responsive navigation and mobile menu
- 🎬 Animated page entrances
- 👁️ Scroll-triggered content reveals
- ♾️ Continuously scrolling artwork ribbons
- 🌑 Custom atmospheric backgrounds and glow effects
- ♿ Reduced-motion accessibility support
- 🧩 Reusable React component architecture
- 🌐 Headless WordPress content management
- 🛡️ Automatic local content fallback
- ⚡ Vite-powered production builds

---

## 🏗️ Headless WordPress Architecture

The Kevin Inks website separates content management from frontend presentation.

```text
WordPress CMS
├── General website content
├── Completed tattoo work
├── Available tattoo designs
├── Artist information
└── Contact information
        ↓
Custom WordPress REST API
        ↓
React Content Client
        ↓
Typed React Components
        ↓
Public Website
```

WordPress delivers content through a custom REST API endpoint:

```text
/wp-json/kevin-inks/v1/content
```

The custom WordPress plugin provides the administration interface and returns three primary content groups:

- Website content
- Completed portfolio work
- Available tattoo designs

React receives the content and displays it through the custom frontend.

---

## 🛡️ CMS Fallback System

The frontend contains a local fallback-content system.

If any of the following happen:

- The WordPress URL is missing
- WordPress is temporarily unavailable
- The REST endpoint returns an error
- WordPress returns an unexpected response
- The portfolio or designs collection is empty

The application automatically uses the typed local content bundled with the frontend.

This prevents the public website from becoming blank or unusable during a CMS outage.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| ⚛️ **React 18** | Component-based user interface |
| 🔷 **TypeScript 5** | Type-safe frontend development |
| ⚡ **Vite 5** | Development server and production builds |
| 🎨 **Tailwind CSS 3** | Responsive layouts and component styling |
| 🎬 **Framer Motion 11** | Animations, transitions, and interactive motion |
| 🌐 **WordPress** | Headless content-management system |
| 🐘 **PHP** | Custom WordPress plugin development |
| 🔌 **WordPress REST API** | Content delivery between WordPress and React |
| 🖌️ **CSS3** | Custom effects, animation, and design-system details |
| 🧱 **HTML5** | Semantic structure and accessibility |
| 🔧 **PostCSS** | CSS processing |
| 🌍 **Autoprefixer** | Cross-browser CSS support |
| ▲ **Vercel** | Frontend hosting and production deployment |

---

## 🖼️ Website Sections

### 🏠 Hero Section

The hero provides a cinematic introduction to the Kevin Inks brand.

It includes:

- Artist positioning
- Primary brand statement
- Supporting copy
- Las Vegas location
- Instagram profile
- Portfolio navigation
- Consultation calls to action
- Mobile text and phone actions
- Responsive background artwork

---

### 🎨 Selected Work

The Selected Work section presents Kevin’s completed tattoo portfolio through a continuously moving artwork ribbon.

Visitors can select individual pieces to open an expanded portfolio experience.

Each portfolio entry can contain:

- Tattoo image
- Project title
- Tattoo style
- Placement
- Additional details

---

### 💎 Available Designs

The Available Designs section displays Kevin’s original tattoo concepts.

Each design can include:

- Design title
- Availability status
- Recommended placement
- Suggested dimensions
- Full-size artwork preview
- One-of-one exclusivity information

Designs can be marked as:

- 🟢 Available
- 🟡 Reserved
- 🔒 Claimed or retired

Once a one-of-one design is tattooed, it can be removed from availability so the client’s artwork remains unique.

---

### 🖋️ The Experience

The Experience section explains Kevin’s client process in four stages.

#### 1. The Spark

The consultation begins with the client’s idea, story, memory, or inspiration.

#### 2. Drawn From Nothing

Kevin creates an original composition specifically for the client and their body.

#### 3. The Session

The tattoo is completed through a private, comfortable, and personalized studio experience.

#### 4. Made to Outlast

The design, linework, and aftercare process are built around the long-term quality of the tattoo.

---

### 👤 About Kevin

The About section introduces Kevin’s artistic philosophy and professional approach.

It includes:

- Responsive circular portrait
- Artist biography
- Personal quote
- Years of experience
- Commitment to original designs
- Private one-on-one session model
- Link to Kevin’s extended story

The section uses subtle hover animation, luxury typography, champagne accents, and a responsive two-column layout.

---

### 📬 The Inner Circle

The Inner Circle section presents an email-community signup experience.

Its purpose is to give subscribers access to:

- New tattoo-design drops
- Early booking openings
- Artwork announcements
- Behind-the-scenes stories
- Exclusive availability updates

> The current frontend includes the signup interface and success state. A production email provider such as Mailchimp, Kit, or Beehiiv can be connected separately.

---

### 📅 Final Booking Section

The final call-to-action reduces booking friction by clearly directing prospective clients toward a consultation.

Kevin prefers text-based booking, so mobile-native SMS actions are featured prominently alongside phone contact options.

---

## 📝 WordPress-Managed Content

The WordPress CMS can manage:

- Brand name
- Navigation labels
- Hero headings and supporting copy
- Hero background image
- Booking button labels
- Instagram information
- Completed tattoo portfolio
- Original available designs
- Design statuses
- Experience-section content
- About-section content
- Artist portrait
- Artist quote
- Professional statistics
- Email-section messaging
- Final booking content
- Contact information
- Footer content
- Social-media links

The CMS manages content while the React application retains control over the website’s design and structure.

---

## 📁 Project Structure

```text
kevin-inks/
├── public/
│   ├── hero.png
│   ├── kevin.jpg
│   ├── kevin-tatts.jpg
│   └── tattoo artwork
│
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Designs.tsx
│   │   ├── EmailList.tsx
│   │   ├── Experience.tsx
│   │   ├── FinalCta.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Nav.tsx
│   │   ├── Reveal.tsx
│   │   └── Work.tsx
│   │
│   ├── App.tsx
│   ├── data.ts
│   ├── index.css
│   ├── main.tsx
│   ├── siteContent.ts
│   └── wordpress.ts
│
├── wordpress-plugin/
│   ├── kevin-inks-headless/
│   └── kevin-inks-headless-plugin.zip
│
├── HEADLESS-WORDPRESS-PRODUCTION-RUNBOOK.md
├── .env.example
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🧩 Component Architecture

Every major website section is separated into a reusable React component.

| Component | Responsibility |
| --- | --- |
| `Nav.tsx` | Desktop navigation and mobile menu |
| `Hero.tsx` | Main brand introduction and booking actions |
| `Work.tsx` | Completed tattoo portfolio |
| `Designs.tsx` | Original available-design gallery |
| `Experience.tsx` | Client journey and creative process |
| `About.tsx` | Artist biography and statistics |
| `EmailList.tsx` | Email-community interface |
| `FinalCta.tsx` | Final consultation call to action |
| `Footer.tsx` | Contact, social, and business information |
| `Reveal.tsx` | Reusable scroll-reveal animation wrapper |



## ▲ Vercel Deployment

The React frontend is configured for deployment on Vercel.

Add the following environment variable to the Vercel project:

```env
VITE_WORDPRESS_URL=https://your-wordpress-site.com
```

After adding or changing the environment variable, trigger a new production deployment.

The WordPress installation and the custom Kevin Inks Headless Content plugin must remain active for live CMS content to load.

---

## ♿ Accessibility

Accessibility considerations include:

- Semantic HTML structure
- Descriptive image alternative text
- Keyboard-accessible buttons
- Accessible mobile navigation
- ARIA labels for gallery controls
- ARIA-expanded states
- Reduced-motion support
- Readable text contrast
- Responsive typography
- Lazy loading for non-critical images

---

## ⚡ Performance and Resilience

The project includes:

- Vite-optimized production builds
- Lazy-loaded portfolio images
- Reusable content requests
- Local fallback data
- Minimal external dependencies
- Responsive image presentation
- CSS-powered visual effects
- Graceful WordPress failure handling
- TypeScript content validation

---

## 💡 Engineering Skills Demonstrated

This project demonstrates my ability to:

- Build a production-focused React application
- Develop reusable TypeScript components
- Create responsive interfaces with Tailwind CSS
- Develop a custom headless WordPress architecture
- Build a custom WordPress plugin using PHP
- Create and consume a custom REST API
- Model editable website content with TypeScript interfaces
- Validate remote CMS responses
- Implement graceful fallback behavior
- Build interactive image galleries and modals
- Create responsive navigation systems
- Design conversion-focused calls to action
- Balance motion, accessibility, and usability
- Transform a real artist’s identity into a digital brand
- Document deployment and ongoing administration procedures

---

## 👨‍💻 Developer

### Brandon Stevenson

IT professional and full-stack developer with experience in endpoint management, enterprise infrastructure, PowerShell automation, and modern web development.

- 🌐 [Portfolio](https://brandons-resume.com/)
- 💻 [GitHub](https://github.com/Programmer-stevenson)
- 💼 [LinkedIn](https://www.linkedin.com/in/brandonstevensonprograms/)

---

## 📌 Project Status

🟢 **Active Client Project**

The frontend, WordPress content model, and CMS integration are structured for continued content updates and future feature development.

---

## 🔒 License

This repository is available for professional portfolio and evaluation purposes.

The source code, written content, branding, visual designs, and image assets may not be copied, redistributed, modified, or used commercially without permission from the project owner.

---

<div align="center">

### 🖋️ Original Tattoos. Lasting Stories.

Designed and developed by **Brandon Stevenson** for **Kevin Inks**.




