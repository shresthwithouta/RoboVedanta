# 🎓 Teacher Selection System - Implementation Plan

## 📋 Overview

**Goal**: Create an Amazon-like educator selection system where students can browse teachers, view detailed profiles, and select their preferred teacher when purchasing a course.

**Key Requirements**:

- Browse teachers in a card-based gallery
- Click on teacher cards to view detailed individual profiles
- Select teachers during course enrollment
- Admin panel for CRUD operations (Create, Read, Update, Delete)
- Start with 5-6 hardcoded teachers
- Scalable architecture for future additions

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND LAYERS                       │
├─────────────────────────────────────────────────────────┤
│ 1. Teacher Browse Page (/teachers)                      │
│    • Teacher Grid with Cards                            │
│    • Filter by subject/grade                            │
│    • Search functionality                               │
├─────────────────────────────────────────────────────────┤
│ 2. Teacher Detail Page (/teachers/[id])                 │
│    • Full profile display                               │
│    • Bio, qualifications, specialties                   │
│    • "Select This Teacher" CTA                          │
├─────────────────────────────────────────────────────────┤
│ 3. Course Enrollment Integration                        │
│    • Teacher selection dropdown in enrollment form      │
│    • Selected teacher displayed on confirmation         │
├─────────────────────────────────────────────────────────┤
│ 4. Admin Panel (/admin/teachers)                        │
│    • Teacher list with edit/delete actions              │
│    • Create new teacher form                            │
│    • Edit existing teacher form                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    DATA LAYER                            │
├─────────────────────────────────────────────────────────┤
│ Teacher Data Structure:                                 │
│ {                                                        │
│   id: string                                            │
│   name: string                                          │
│   title: string (e.g., "Senior Robotics Educator")     │
│   imageUrl: string                                      │
│   bio: string                                           │
│   specialties: string[] (e.g., ["Arduino", "AI"])       │
│   qualifications: string[]                              │
│   experience: string (e.g., "10+ years")                │
│   grades: string[] (e.g., ["6-8", "9-10"])              │
│   availability: string (e.g., "Weekdays", "Weekends")   │
│   email: string                                         │
│   featured: boolean (show in highlights)               │
│   active: boolean (currently accepting students)        │
│   createdAt: date                                       │
│   updatedAt: date                                       │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 Visual Design (Following RoboVedanta Theme)

### 1. Teacher Browse Page (`/teachers`)

```
┌─────────────────────────────────────────────────────────────┐
│                       HERO SECTION                           │
│  • Title: "Meet Our Expert Educators"                       │
│  • Shimmer on "Expert"                                      │
│  • Subtitle: "Select your guide to robotics mastery"       │
│  • Search bar + Filter dropdown                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              TEACHER GRID (3 columns desktop)                │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │  Photo   │  │  Photo   │  │  Photo   │                 │
│  │          │  │          │  │          │                 │
│  │ Dr. Name │  │ Mr. Name │  │ Ms. Name │                 │
│  │ Title    │  │ Title    │  │ Title    │                 │
│  │          │  │          │  │          │                 │
│  │ • Spec 1 │  │ • Spec 1 │  │ • Spec 1 │                 │
│  │ • Spec 2 │  │ • Spec 2 │  │ • Spec 2 │                 │
│  │          │  │          │  │          │                 │
│  │ 10+ yrs  │  │ 8+ yrs   │  │ 12+ yrs  │                 │
│  │          │  │          │  │          │                 │
│  │ [View]   │  │ [View]   │  │ [View]   │                 │
│  └──────────┘  └──────────┘  └──────────┘                 │
│                                                              │
│  [Show More Teachers...]                                    │
└─────────────────────────────────────────────────────────────┘
```

### 2. Teacher Detail Page (`/teachers/[id]`)

```
┌─────────────────────────────────────────────────────────────┐
│              TEACHER PROFILE HEADER                          │
│  ┌─────────────┬─────────────────────────────────────┐     │
│  │             │  Dr. Rajesh Kumar                    │     │
│  │   Photo     │  Senior Robotics Educator            │     │
│  │  (Larger)   │  ⭐ Featured Educator                │     │
│  │             │                                       │     │
│  │             │  📧 rajesh@robovedanta.com           │     │
│  │             │  ⏰ Available: Weekdays & Weekends   │     │
│  └─────────────┴─────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ABOUT / BIO SECTION                             │
│                                                              │
│  "Dr. Rajesh Kumar brings over 15 years of experience in    │
│   robotics education and has mentored 500+ students..."     │
│                                                              │
│  Specialties:                                               │
│  ✓ Arduino & Microcontrollers                              │
│  ✓ AI & Machine Learning                                   │
│  ✓ Sensor Integration                                      │
│  ✓ Competition Preparation                                 │
│                                                              │
│  Qualifications:                                            │
│  • Ph.D. in Robotics Engineering                           │
│  • M.Tech in Computer Science                              │
│  • CBSE Certified Robotics Trainer                         │
│                                                              │
│  Teaching Experience:                                       │
│  • 15+ years in robotics education                         │
│  • Former lead at prestigious robotics academy             │
│  • Trained 500+ students nationwide                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              ENROLLMENT CTA                                  │
│                                                              │
│  [Select Dr. Kumar as My Educator]  [Back to All Teachers] │
│                                                              │
│  "Selecting a teacher helps us personalize your learning    │
│   experience. You can change this later."                   │
└─────────────────────────────────────────────────────────────┘
```

### 3. Course Enrollment Form Integration (Updated)

```
┌─────────────────────────────────────────────────────────────┐
│              ENROLLMENT FORM (UPDATED)                       │
│                                                              │
│  Registration Form:                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Student Name *        │ Parent/Guardian Name *    │   │
│  │ Email Address *       │ Phone Number *            │   │
│  │ Current Grade *       │ Interested Program *      │   │
│  │ (Dropdown 1-12)       │ (Dropdown:                │   │
│  │                       │  - Simulation ₹3,500      │   │
│  │                       │  - Hardware ₹8,000)       │   │
│  │                                                       │   │
│  │ ┌──────────────────────────────────────────────┐    │   │
│  │ │ Preferred Educator *                         │    │   │
│  │ │ [Dropdown]                                    │    │   │
│  │ │ • Dr. Rajesh Kumar - Arduino & AI Expert     │    │   │
│  │ │ • Ms. Priya Sharma - Sensor Specialist       │    │   │
│  │ │ • Mr. Anil Verma - Competition Coach         │    │   │
│  │ │ • No preference / I'll decide later          │    │   │
│  │ └──────────────────────────────────────────────┘    │   │
│  │                                                       │   │
│  │ [Browse All Educators]    ← Link to /teachers       │   │
│  │                                                       │   │
│  │ Message / Questions (textarea)                      │   │
│  │                                                       │   │
│  │ [Submit Registration]                                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Phases

### **Phase 1: Data Foundation** ⏱️ 1-2 hours

#### 1.1 Create Teacher Data File

**File**: `/src/data/teachers.js`

```javascript
export const teachersData = [
  {
    id: "rajesh-kumar",
    name: "Dr. Rajesh Kumar",
    title: "Senior Robotics Educator",
    imageUrl: "/teachers/rajesh-kumar.jpg",
    bio: "Dr. Rajesh Kumar brings over 15 years of experience...",
    specialties: [
      "Arduino & Microcontrollers",
      "AI & Machine Learning",
      "Sensor Integration",
    ],
    qualifications: [
      "Ph.D. in Robotics Engineering",
      "M.Tech in Computer Science",
      "CBSE Certified Robotics Trainer",
    ],
    experience: "15+ years",
    grades: ["6-8", "9-10", "11-12"],
    availability: "Weekdays & Weekends",
    email: "rajesh@robovedanta.com",
    featured: true,
    active: true,
  },
  // Add 4-5 more teachers...
];
```

#### 1.2 Create Teacher Helper Functions

**File**: `/src/lib/teachers.js`

```javascript
import { teachersData } from "@/data/teachers";

export const getAllTeachers = () => teachersData;

export const getActiveTeachers = () => teachersData.filter((t) => t.active);

export const getFeaturedTeachers = () =>
  teachersData.filter((t) => t.featured && t.active);

export const getTeacherById = (id) => teachersData.find((t) => t.id === id);

export const getTeachersByGrade = (grade) =>
  teachersData.filter((t) => t.grades.includes(grade));
```

---

### **Phase 2: Teacher Components** ⏱️ 2-3 hours

#### 2.1 TeacherCard Component

**File**: `/src/components/teachers/TeacherCard.js`

```javascript
"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TeacherCard({ teacher }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl 
                 overflow-hidden transition-all duration-700 
                 hover:border-[#B8860B] hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-b from-[#002246] to-[#002850]">
        <Image
          src={teacher.imageUrl}
          alt={teacher.name}
          fill
          className="object-cover"
        />
        {teacher.featured && (
          <span
            className="absolute top-4 right-4 bg-gradient-to-r 
                         from-[#E6B73B] to-[#B8860B] text-[#002246] 
                         px-3 py-1 rounded-full text-xs font-bold"
          >
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white">{teacher.name}</h3>
          <p className="text-[#B8860B] text-sm">{teacher.title}</p>
        </div>

        <div className="space-y-2">
          {teacher.specialties.slice(0, 3).map((spec, idx) => (
            <div key={idx} className="flex items-center text-sm text-white/80">
              <span className="text-[#B8860B] mr-2">•</span>
              {spec}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-white/60 text-sm">{teacher.experience}</span>
          <Link
            href={`/teachers/${teacher.id}`}
            className="px-4 py-2 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                         text-[#002246] rounded-lg font-semibold text-sm
                         hover:scale-105 transition-transform duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
```

#### 2.2 TeacherDetailHero Component

**File**: `/src/components/teachers/TeacherDetailHero.js`

---

### **Phase 3: Teacher Pages** ⏱️ 2-3 hours

#### 3.1 Teachers Browse Page

**File**: `/src/app/teachers/page.js`

```javascript
import { getAllTeachers, getFeaturedTeachers } from "@/lib/teachers";
import TeacherCard from "@/components/teachers/TeacherCard";
import { Search, Filter } from "lucide-react";

export default function TeachersPage() {
  const allTeachers = getAllTeachers();
  const featuredTeachers = getFeaturedTeachers();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#002246] to-[#002F5A]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Meet Our{" "}
            <span
              className="bg-gradient-to-r from-[#E6B73B] to-[#B8860B] 
                           bg-clip-text text-transparent"
            >
              Expert Educators
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Select your guide to robotics mastery
          </p>

          {/* Search & Filter */}
          <div className="flex gap-4 max-w-2xl mx-auto mt-8">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 
                               text-white/40"
                size={20}
              />
              <input
                type="text"
                placeholder="Search educators..."
                className="w-full pl-12 pr-4 py-3 bg-[#002850] 
                              border border-[#B8860B]/20 rounded-xl
                              text-white placeholder:text-white/40 
                              focus:border-[#B8860B] outline-none"
              />
            </div>
            <button
              className="px-6 py-3 bg-[#002850] border border-[#B8860B]/20
                             rounded-xl text-white hover:border-[#B8860B]
                             transition-all duration-300 flex items-center gap-2"
            >
              <Filter size={20} />
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Featured Teachers */}
      {featuredTeachers.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">
              ⭐ Featured Educators
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTeachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Teachers */}
      <section className="py-12 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">All Educators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
```

#### 3.2 Teacher Detail Page

**File**: `/src/app/teachers/[id]/page.js`

```javascript
import { getTeacherById } from "@/lib/teachers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Mail, Clock, Award, BookOpen, Star, ArrowLeft } from "lucide-react";

export default function TeacherDetailPage({ params }) {
  const teacher = getTeacherById(params.id);

  if (!teacher) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#002246] to-[#002F5A] pt-24">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/teachers"
          className="flex items-center gap-2 text-[#B8860B] 
                       hover:text-[#E6B73B] transition-colors"
        >
          <ArrowLeft size={20} />
          Back to All Teachers
        </Link>
      </div>

      {/* Profile Header */}
      <section className="px-4 pb-12">
        <div
          className="max-w-6xl mx-auto bg-[#002850] border border-[#B8860B]/20 
                      rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {/* Photo */}
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
              <Image
                src={teacher.imageUrl}
                alt={teacher.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {teacher.name}
                </h1>
                <p className="text-xl text-[#B8860B]">{teacher.title}</p>
                {teacher.featured && (
                  <span
                    className="inline-flex items-center gap-2 mt-4 
                                 bg-gradient-to-r from-[#E6B73B] to-[#B8860B] 
                                 text-[#002246] px-4 py-2 rounded-full text-sm 
                                 font-bold"
                  >
                    <Star size={16} fill="currentColor" />
                    Featured Educator
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-white/80">
                  <Mail className="text-[#B8860B]" size={20} />
                  <span className="text-sm">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="text-[#B8860B]" size={20} />
                  <span className="text-sm">{teacher.availability}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <Award className="text-[#B8860B]" size={20} />
                  <span className="text-sm">{teacher.experience}</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <BookOpen className="text-[#B8860B]" size={20} />
                  <span className="text-sm">
                    Grades: {teacher.grades.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio & Details */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* About */}
          <div
            className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-8 space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">About</h2>
            <p className="text-white/80 leading-relaxed">{teacher.bio}</p>
          </div>

          {/* Specialties */}
          <div
            className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-8 space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">Specialties</h2>
            <ul className="space-y-3">
              {teacher.specialties.map((spec, idx) => (
                <li key={idx} className="flex items-center gap-3 text-white/80">
                  <span className="text-[#B8860B] text-xl">✓</span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div
            className="bg-[#002850] border border-[#B8860B]/20 
                        rounded-2xl p-8 space-y-4"
          >
            <h2 className="text-2xl font-bold text-white">Qualifications</h2>
            <ul className="space-y-3">
              {teacher.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-3 text-white/80">
                  <span className="text-[#B8860B] mt-1">•</span>
                  {qual}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 pb-24">
        <div
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#002850] to-[#002246]
                      border border-[#B8860B]/20 rounded-2xl p-8 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">
            Ready to Learn with {teacher.name.split(" ")[0]}?
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Selecting a teacher helps us personalize your learning experience.
            You can change this later during enrollment.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/programs?teacher=${teacher.id}"
              className="px-8 py-4 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                           text-[#002246] rounded-xl font-bold text-lg
                           hover:scale-105 transition-transform duration-300"
            >
              Select {teacher.name.split(" ")[0]} as My Educator
            </Link>
            <Link
              href="/teachers"
              className="px-8 py-4 border-2 border-[#B8860B] text-[#B8860B]
                           rounded-xl font-bold text-lg
                           hover:bg-[#B8860B] hover:text-[#002246]
                           transition-all duration-300"
            >
              Browse Other Teachers
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

### **Phase 4: Admin Panel** ⏱️ 3-4 hours

#### 4.1 Admin Layout & Authentication

**File**: `/src/app/admin/layout.js`

```javascript
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, LogOut, Home } from "lucide-react";

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Simple password protection (replace with proper auth later)
  const ADMIN_PASSWORD = "robo2026"; // Change this!

  useEffect(() => {
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-[#002246] to-[#002F5A] 
                    flex items-center justify-center px-4"
      >
        <div
          className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl 
                      p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                              rounded-xl text-white outline-none 
                              focus:border-[#B8860B]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E6B73B] 
                             to-[#B8860B] text-[#002246] rounded-xl font-bold
                             hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#002246] to-[#002F5A]">
      {/* Admin Navbar */}
      <nav className="bg-[#002850] border-b border-[#B8860B]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <nav className="flex gap-4">
              <Link
                href="/admin/teachers"
                className="flex items-center gap-2 text-white/80 
                             hover:text-[#B8860B] transition-colors"
              >
                <Users size={20} />
                Teachers
              </Link>
            </nav>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-white/80 
                           hover:text-[#B8860B] transition-colors"
            >
              <Home size={20} />
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/80 
                             hover:text-red-400 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="py-8">{children}</main>
    </div>
  );
}
```

#### 4.2 Admin Teachers List

**File**: `/src/app/admin/teachers/page.js`

```javascript
"use client";
import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Image from "next/image";

// In production, this would fetch from database
import { teachersData } from "@/data/teachers";

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState(teachersData);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
      // In production: API call to delete from database
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white">Manage Teachers</h1>
        <Link
          href="/admin/teachers/create"
          className="flex items-center gap-2 px-6 py-3 
                       bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                       text-[#002246] rounded-xl font-bold
                       hover:scale-105 transition-transform duration-300"
        >
          <Plus size={20} />
          Add New Teacher
        </Link>
      </div>

      {/* Teachers Table */}
      <div
        className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl 
                    overflow-hidden"
      >
        <table className="w-full">
          <thead className="bg-[#002246]">
            <tr>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Photo
              </th>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Name
              </th>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Title
              </th>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Status
              </th>
              <th className="px-6 py-4 text-left text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, idx) => (
              <tr
                key={teacher.id}
                className={`border-t border-[#B8860B]/10 
                           ${idx % 2 === 0 ? "bg-[#002850]" : "bg-[#002246]/50"}`}
              >
                <td className="px-6 py-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={teacher.imageUrl}
                      alt={teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-white font-medium">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-white/70">{teacher.title}</td>
                <td className="px-6 py-4 text-white/70">
                  {teacher.experience}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                 ${
                                   teacher.active
                                     ? "bg-green-500/20 text-green-400"
                                     : "bg-red-500/20 text-red-400"
                                 }`}
                  >
                    {teacher.active ? "Active" : "Inactive"}
                  </span>
                  {teacher.featured && (
                    <span
                      className="ml-2 px-3 py-1 rounded-full text-xs font-semibold
                                   bg-[#B8860B]/20 text-[#B8860B]"
                    >
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/teachers/${teacher.id}`}
                      target="_blank"
                      className="p-2 text-white/60 hover:text-[#B8860B] 
                                   transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/teachers/edit/${teacher.id}`}
                      className="p-2 text-white/60 hover:text-[#B8860B] 
                                   transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(teacher.id)}
                      className="p-2 text-white/60 hover:text-red-400 
                                     transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-[#002850] border border-[#B8860B]/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-[#B8860B] mb-2">
            {teachers.length}
          </div>
          <div className="text-white/70">Total Teachers</div>
        </div>
        <div className="bg-[#002850] border border-[#B8860B]/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {teachers.filter((t) => t.active).length}
          </div>
          <div className="text-white/70">Active Teachers</div>
        </div>
        <div className="bg-[#002850] border border-[#B8860B]/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-[#E6B73B] mb-2">
            {teachers.filter((t) => t.featured).length}
          </div>
          <div className="text-white/70">Featured Teachers</div>
        </div>
      </div>
    </div>
  );
}
```

#### 4.3 Create/Edit Teacher Form

**File**: `/src/components/admin/TeacherForm.js`

```javascript
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function TeacherForm({ teacher = null, mode = "create" }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: teacher?.name || "",
    title: teacher?.title || "",
    imageUrl: teacher?.imageUrl || "",
    bio: teacher?.bio || "",
    specialties: teacher?.specialties?.join("\n") || "",
    qualifications: teacher?.qualifications?.join("\n") || "",
    experience: teacher?.experience || "",
    grades: teacher?.grades || [],
    availability: teacher?.availability || "",
    email: teacher?.email || "",
    featured: teacher?.featured || false,
    active: teacher?.active !== false,
  });

  const gradeOptions = ["1-3", "4-5", "6-8", "9-10", "11-12"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const teacherData = {
      ...formData,
      id: teacher?.id || formData.name.toLowerCase().replace(/\s+/g, "-"),
      specialties: formData.specialties.split("\n").filter((s) => s.trim()),
      qualifications: formData.qualifications
        .split("\n")
        .filter((q) => q.trim()),
    };

    console.log(mode === "create" ? "Creating" : "Updating", teacherData);
    // In production: API call to save to database

    alert(`Teacher ${mode === "create" ? "created" : "updated"} successfully!`);
    router.push("/admin/teachers");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Basic Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="Dr. Rajesh Kumar"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">
              Title/Designation *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="Senior Robotics Educator"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="rajesh@robovedanta.com"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Experience *</label>
            <input
              type="text"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="15+ years"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Availability *</label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="Weekdays & Weekends"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">Photo URL *</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                            rounded-xl text-white outline-none focus:border-[#B8860B]"
              placeholder="/teachers/name.jpg"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-white/80 mb-2">Bio/Description *</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                             rounded-xl text-white outline-none focus:border-[#B8860B]
                             min-h-32"
            placeholder="Dr. Rajesh Kumar brings over 15 years of experience..."
            required
          />
        </div>
      </div>

      {/* Specialties & Qualifications */}
      <div className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Expertise</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 mb-2">
              Specialties (one per line) *
            </label>
            <textarea
              value={formData.specialties}
              onChange={(e) =>
                setFormData({ ...formData, specialties: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                               rounded-xl text-white outline-none focus:border-[#B8860B]
                               min-h-40"
              placeholder="Arduino & Microcontrollers&#10;AI & Machine Learning&#10;Sensor Integration"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">
              Qualifications (one per line) *
            </label>
            <textarea
              value={formData.qualifications}
              onChange={(e) =>
                setFormData({ ...formData, qualifications: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#002246] border border-[#B8860B]/20
                               rounded-xl text-white outline-none focus:border-[#B8860B]
                               min-h-40"
              placeholder="Ph.D. in Robotics Engineering&#10;M.Tech in Computer Science&#10;CBSE Certified Trainer"
              required
            />
          </div>
        </div>
      </div>

      {/* Grade Levels & Status */}
      <div className="bg-[#002850] border border-[#B8860B]/20 rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-white">Teaching Details</h2>

        <div>
          <label className="block text-white/80 mb-3">Grade Levels *</label>
          <div className="flex flex-wrap gap-3">
            {gradeOptions.map((grade) => (
              <label
                key={grade}
                className="flex items-center gap-2 px-4 py-2 bg-[#002246] 
                              border border-[#B8860B]/20 rounded-lg cursor-pointer
                              hover:border-[#B8860B] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.grades.includes(grade)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        grades: [...formData.grades, grade],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        grades: formData.grades.filter((g) => g !== grade),
                      });
                    }
                  }}
                  className="text-[#B8860B]"
                />
                <span className="text-white">{grade}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) =>
                setFormData({ ...formData, active: e.target.checked })
              }
              className="w-5 h-5"
            />
            <span className="text-white">Active (accepting students)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-5 h-5"
            />
            <span className="text-white">Featured educator</span>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 border-2 border-[#B8860B] text-[#B8860B]
                         rounded-xl font-bold hover:bg-[#B8860B] hover:text-[#002246]
                         transition-all duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-[#E6B73B] to-[#B8860B]
                         text-[#002246] rounded-xl font-bold
                         hover:scale-105 transition-transform duration-300"
        >
          {mode === "create" ? "Create Teacher" : "Update Teacher"}
        </button>
      </div>
    </form>
  );
}
```

---

## 📝 Implementation Checklist

### ✅ Phase 1: Data Foundation

- [ ] Create `/src/data/teachers.js` with 5-6 hardcoded teachers
- [ ] Create `/src/lib/teachers.js` with helper functions
- [ ] Add teacher images to `/public/teachers/`

### ✅ Phase 2: Components

- [ ] Create `TeacherCard` component
- [ ] Create `TeacherDetailHero` component
- [ ] Create `TeacherForm` component (admin)

### ✅ Phase 3: Pages

- [ ] Create `/teachers` browse page
- [ ] Create `/teachers/[id]` detail page
- [ ] Update `/programs/page.js` enrollment form with teacher dropdown

### ✅ Phase 4: Admin Panel

- [ ] Create `/admin/layout.js` with authentication
- [ ] Create `/admin/teachers` list page
- [ ] Create `/admin/teachers/create` page
- [ ] Create `/admin/teachers/edit/[id]` page

### ✅ Phase 5: Integration

- [ ] Add link to "Browse Teachers" in Programs page
- [ ] Add link to "Meet Our Teachers" in main navigation
- [ ] Test teacher selection flow end-to-end

---

## 🔮 Future Enhancements (Post-MVP)

### Database Integration

- Replace hardcoded data with MongoDB/PostgreSQL
- Real-time CRUD operations
- Image upload functionality (Cloudinary/AWS S3)

### Advanced Features

- Teacher ratings & reviews
- Student-teacher matching algorithm
- Live availability calendar
- Video introductions
- Teacher portfolios (past projects)

### Analytics

- Track most selected teachers
- Monitor teacher popularity
- Student success rates by teacher

---

## 🎯 Key Design Principles

1. **Consistency**: Follow RoboVedanta design system (navy blue, metallic gold)
2. **Scalability**: Structure supports unlimited teachers via admin panel
3. **User Experience**: Clear navigation, informative profiles, easy selection
4. **Premium Feel**: Cinematic animations, high-quality imagery, professional layout
5. **Mobile-First**: Fully responsive across all devices

---

## 🚀 Quick Start Commands

```bash
# No additional dependencies needed!
# Everything uses existing Next.js + Tailwind + Framer Motion

# Start development server
npm run dev

# Access admin panel
http://localhost:3000/admin/teachers
# Password: robo2026 (change in /admin/layout.js)
```

---

**Implementation Time**: 8-12 hours  
**Complexity**: Medium  
**Dependencies**: None (uses existing stack)  
**Priority**: High (client requested)

---

This system provides the foundation for scalable teacher management while maintaining the premium RoboVedanta aesthetic! 🎓✨