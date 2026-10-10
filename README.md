# Premium Full-Stack Developer Portfolio & CMS

A production-grade, highly animated personal developer portfolio and content management platform built for **Lokesh Kumar Rathore** (B.Tech in Artificial Intelligence & Data Science, IIMT College of Engineering).

Featuring a curated dark-mode visual aesthetic, custom cursor physics, smooth Framer Motion animations, verified resume data, downloadable resume PDF, dynamic project showcases, and a secure private administrator dashboard with real MongoDB persistence.

---

## ✨ Highlights & Key Features

- **Visual Aesthetics & Polish**: Sleek near-black / deep navy canvas (`#050811`), electric blue, violet, and subtle cyan glows, glassmorphism cards, and Space Grotesk / Inter typography.
- **Custom Desktop Cursor**: Interactive spring-follow cursor with hover scaling over buttons and links (respects `prefers-reduced-motion` and touch devices).
- **Hero Showcase**: Animated floating 3D-styled code editor with live syntax highlighting and responsive availability beacon.
- **Curated Skills Matrix**: Clean categorized sections (Frontend, Backend, Database, Tools) with official devicons and architectural tags (no fake percentage bars).
- **Real Project Showcase**: Wanderlust, NovaFood, Interactive Finance Dashboard, Real-Time Weather App, and Dynamic Recipe Finder with modal breakdowns and source links.
- **Resume Download**: Direct download buttons in Hero and About sections serving the authentic `Lokesh_Kumar_Rathore_Resume.pdf`.
- **Private Admin CMS Dashboard (`/admin/login` & `/admin/dashboard`)**:
  - Secure bcrypt password hashing & HTTP-only JWT cookies
  - Add, edit, reorder, feature, and delete projects with confirmation modals
  - Image upload support via Multer & Cloudinary (with automatic local storage fallback)
  - Live visitor contact inquiries inbox
  - Editable availability status and site settings
- **Robust Backend API**: Node.js, Express, MongoDB with Mongoose, rate limiting for login and contact forms, and graceful offline in-memory fallbacks.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, React Router v6, Axios |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, Cookie-Parser, CORS, Express-Rate-Limit |
| **Security & Auth** | JSON Web Tokens (JWT) stored in HTTP-Only SameSite cookies, bcryptjs hashing |
| **Media & Uploads** | Multer, Cloudinary API, with local `/uploads` static file fallback |
| **Fonts & Icons** | Space Grotesk, Inter, JetBrains Mono, Devicons |

---

## 📂 Project Structure

```
NEW PORTFOLIO/
├── client/                      # Frontend React + Vite Application
│   ├── public/
│   │   ├── assets/
│   │   │   └── Lokesh_Kumar_Rathore_Resume.pdf  # Verified downloadable resume
│   │   ├── profile.jpg          # Profile photo
│   │   ├── wanderlust.jpg       # Wanderlust project preview
│   │   ├── novafood.jpg         # NovaFood project preview
│   │   └── project-*.png        # Real project preview screenshots
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx       # Glassmorphic header & mobile navigation
│   │   │   ├── CustomCursor.jsx # Spring-follow desktop cursor
│   │   │   ├── Hero.jsx         # Hero section & interactive floating IDE
│   │   │   ├── About.jsx        # Verified bio & academic credentials
│   │   │   ├── Skills.jsx       # Categorized skill chips & filter tabs
│   │   │   ├── Projects.jsx     # Project cards grid & live API loader
│   │   │   ├── ProjectModal.jsx # Detailed project modal with problem/solution
│   │   │   ├── ExperienceEducation.jsx # Timeline for Edunet, CodSoft & IIMT
│   │   │   ├── Contact.jsx      # Form with API submission & spam limits
│   │   │   ├── Footer.jsx       # Dynamic copyright & back-to-top button
│   │   │   ├── Icons.jsx        # Clean SVG brand icons (GitHub, LinkedIn)
│   │   │   └── AdminRoute.jsx   # Client-side protected route guard
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Admin authentication state provider
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Public portfolio page
│   │   │   ├── AdminLogin.jsx   # Protected admin login screen
│   │   │   ├── AdminDashboard.jsx # CMS for projects, inquiries & settings
│   │   │   └── NotFound.jsx     # Custom 404 page
│   │   ├── services/
│   │   │   └── api.js           # Centralized Axios API client
│   │   ├── data/
│   │   │   └── portfolioData.js # Static seed data for instant loading
│   │   ├── index.css            # Tailwind directives & glass utilities
│   │   ├── main.jsx             # React entry point
│   │   └── App.jsx              # React router configuration
│   ├── index.html               # Google Fonts, meta tags & SEO metadata
│   ├── tailwind.config.js       # Custom colors, glows, animations
│   ├── package.json
│   └── .env.example
│
├── server/                      # Backend Node.js + Express API
│   ├── config/
│   │   ├── db.js                # MongoDB connection handler
│   │   └── cloudinary.js        # Cloudinary setup with fallback
│   ├── controllers/
│   │   ├── authController.js    # Admin login, cookie issuance, logout
│   │   ├── projectController.js # Project CRUD & image processing
│   │   ├── contactController.js # Contact form handling & message inbox
│   │   └── settingController.js # Dynamic site settings
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification from HTTP-only cookie
│   │   ├── uploadMiddleware.js  # Multer image validation (type & size)
│   │   └── rateLimiter.js       # Rate limits for login & contact routes
│   ├── models/
│   │   ├── Admin.js             # Admin schema with bcrypt hooks
│   │   ├── Project.js           # Comprehensive project schema
│   │   ├── Message.js           # Contact inquiry schema
│   │   └── Setting.js           # Editable site settings schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── contactRoutes.js
│   │   └── settingRoutes.js
│   ├── seed/
│   │   ├── initialSeedData.js   # Seed projects & site settings
│   │   └── seedAll.js           # Standalone DB seeding script
│   ├── uploads/                 # Local image uploads directory (fallback)
│   ├── server.js                # Express entry point & CORS configuration
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json                 # Root script runner
└── README.md                    # Project documentation
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v22+ tested)
- **MongoDB**: Local MongoDB community service (`mongodb://127.0.0.1:27017`) or free MongoDB Atlas URI.

---

### 2. Configure Environment Variables

#### Backend (`server/.env`):
Create `server/.env` (or copy from `server/.env.example`):
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=super_secure_portfolio_jwt_secret_lokesh_2026_xyz
ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=Admin@2026!

# Optional: Cloudinary credentials (If left blank, local storage in /uploads is used automatically)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### Frontend (`client/.env`):
Create `client/.env` (or copy from `client/.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies & Seed Database

Open a terminal at the project root:

```bash
# Install backend dependencies
cd server
npm install

# Seed the database with initial admin and projects
npm run seed

# Return to root and install frontend dependencies
cd ../client
npm install
```

---

### 4. Running the Application

You can start the backend and frontend in two separate terminals:

#### Terminal 1 (Backend API):
```bash
cd server
node server.js
# Output: Server running on port 5000 | MongoDB Connected: 127.0.0.1
```

#### Terminal 2 (Frontend Client):
```bash
cd client
npm run dev
# Output: Local: http://localhost:5173/
```

Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## 🔐 Admin Authentication & Dashboard

1. Navigate to **[http://localhost:5173/admin/login](http://localhost:5173/admin/login)** or click the **Admin** shield icon in the top navigation bar.
2. Log in using the seeded credentials:
   - **Email**: `admin@portfolio.dev`
   - **Password**: `Admin@2026!`
   *(You can also click the "Click to Auto-fill" button on the login card during local development).*
3. Inside the Admin Dashboard:
   - **Projects Tab**: Create new projects with file uploads, edit titles/descriptions/tags, toggle publication, toggle featured flags, or delete projects with confirmation.
   - **Inquiries Tab**: Review messages submitted through the contact form, mark them as read, or delete them.
   - **Site Settings Tab**: Change your headline, availability status, LinkedIn profile, and GitHub profile URL on the fly.
4. Security Enforcement:
   - JWT tokens are stored securely in **HTTP-only, SameSite cookies**.
   - Direct API mutations (`POST /api/projects`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`) require a valid admin cookie or Authorization header; unauthenticated requests are rejected with `401 Unauthorized`.

---

## ☁️ Cloudinary Configuration (Optional)

If you have a free [Cloudinary](https://cloudinary.com) account:
1. Copy your **Cloud Name**, **API Key**, and **API Secret** from your Cloudinary dashboard.
2. Paste them into `server/.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
3. Restart the server. Any new project thumbnails uploaded via the Admin Dashboard will be uploaded to Cloudinary CDN automatically. If omitted, files are saved locally into `server/uploads/` and served directly.

---

## 🌐 Production Deployment Guide

### Frontend Deployment (Vercel / Netlify)
1. Set the root directory to `client`.
2. Build Command: `npm run build`
3. Output Directory: `dist`
4. Set Environment Variable:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://your-portfolio-api.onrender.com/api`).

### Backend Deployment (Render / Railway / DigitalOcean)
1. Set the root directory to `server`.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Configure Environment Variables in the provider dashboard:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas cluster connection string (`mongodb+srv://...`)
   - `JWT_SECRET`: A strong secret key
   - `ADMIN_EMAIL`: Your personal admin login email
   - `ADMIN_PASSWORD`: A strong admin password
   - `CLIENT_URL`: Your deployed frontend URL (e.g. `https://lokeshrathore.vercel.app`)

---

## 📄 Verified Candidate Profile
- **Candidate**: Lokesh Kumar Rathore
- **Education**: B.Tech in Artificial Intelligence & Data Science (IIMT College of Engineering, Greater Noida, Aug 2022 – May 2026)
- **Specializations**: Frontend Development, React.js, Full-Stack Web Development, MERN Stack
- **Internships**: Edunet Foundation (AICTE Collaboration) & CodSoft
- **Email**: [lokeshrathore1509@gmail.com](mailto:lokeshrathore1509@gmail.com)
- **GitHub**: [github.com/lokeshrathore1509](https://github.com/lokeshrathore1509)
- **LinkedIn**: [linkedin.com/in/lokesh-rathore-220lr4644](https://www.linkedin.com/in/lokesh-rathore-220lr4644)
