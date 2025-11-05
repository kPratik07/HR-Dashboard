# 🏢 HR Dashboard

A comprehensive employee management system built with modern web technologies. Manage employees, departments, and roles with powerful analytics, secure authentication, and real-time data visualization.

---

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React 19, Tailwind CSS, Chart.js, Lucide React  
**Backend:** Next.js API Routes, NextAuth.js, Prisma ORM, MongoDB, Bcrypt.js, Nodemailer

---

## 📁 Project Structure

```
app/
├── (dashboard)/        # Protected routes (dashboard, employees, departments, roles)
├── api/                # API endpoints (auth, CRUD operations, stats)
├── login/              # Authentication page
├── forgot-password/    # Password reset request
└── reset-password/     # OTP verification
components/             # Reusable UI components
lib/                    # Utility functions
prisma/                 # Database schema & seed
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Gmail account (for password reset)

### Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd HR-Dashboard
npm install

# 2. Configure environment (.env.local)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/hr-dashboard
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# 3. Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Start server
npm run dev
```
**Login:** `hr@example.com` / `hr123`
---
## ✨ Features

- 🔐 **Authentication** - Secure login/signup, role-based access (HR & Employee), password reset with OTP
- 👥 **Employee Management** - CRUD operations, search/filter, department & role assignment
- 🏢 **Department & Roles** - Manage organizational structure
- 📊 **Analytics Dashboard** - Real-time stats, charts, salary analysis, hiring trends
- 📱 **Responsive Design** - Mobile-first, optimized for all devices
---
## 📜 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run db:seed      # Seed database
```
---
## 🐛 Troubleshooting

**Prisma Issues:** Stop dev server → `npx prisma generate`  
**Database Connection:** Check MongoDB Atlas IP whitelist and connection string  
**Email Not Sending:** Verify Gmail App Password (no quotes in .env.local)  
**Reset Database:** `npx prisma db push --force-reset && npm run db:seed`
---
## 👨‍💻 Author

**Pratik**
---
## 📄 License

MIT License - Copyright (c) 2025 Pratik Raj❤️ 
