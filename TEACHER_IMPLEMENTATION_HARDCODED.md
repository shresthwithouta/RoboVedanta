# 🎓 Teacher Selection - Hardcoded Implementation Plan

## 📋 Simplified Scope (No Admin/Backend)

**What We're Building:**

1. Teacher data file (hardcoded in code)
2. Teachers browse page (`/teachers`)
3. Individual teacher detail pages (`/teachers/[id]`)
4. Teacher selection in enrollment flow
5. "Select This Teacher" functionality

**What We're NOT Building:**

- ❌ Admin panel
- ❌ Database
- ❌ Backend API
- ❌ Image upload
- ❌ CRUD operations

---

## 🗂️ File Structure

```
robovedanta/
├── src/
│   ├── data/
│   │   └── teachers.js              # ✨ NEW - Hardcoded teacher data
│   ├── components/
│   │   └── teachers/
│   │       ├── TeacherCard.js       # ✨ NEW - Card component
│   │       └── TeacherDetailHero.js # ✨ NEW - Detail page hero
│   ├── app/
│   │   ├── teachers/
│   │   │   ├── page.js              # ✨ NEW - Browse page
│   │   │   └── [id]/
│   │   │       └── page.js          # ✨ NEW - Detail page
│   │   └── programs/
│   │       └── page.js              # 🔄 UPDATE - Add teacher dropdown
│   └── public/
│       └── teachers/                # ✨ NEW - Teacher photos
│           ├── teacher-1.jpg
│           ├── teacher-2.jpg
│           └── ...
```

---

## 📝 Implementation Steps

### **Step 1️⃣: Create Teacher Data** (5 mins)

**File**: `/src/data/teachers.js`

Create hardcoded data structure that's easy to migrate to database later.

---

### **Step 2️⃣: Create TeacherCard Component** (15 mins)

**File**: `/src/components/teachers/TeacherCard.js`

Displays teacher in grid view with:

- Photo
- Name & title
- Key specialties (top 3)
- Experience
- "View Profile" button

---

### **Step 3️⃣: Create Teachers Browse Page** (20 mins)

**File**: `/src/app/teachers/page.js`

Features:

- Hero section with title
- Grid of teacher cards (3 columns on desktop)
- Featured teachers section
- Responsive layout

---

### **Step 4️⃣: Create Teacher Detail Page** (25 mins)

**File**: `/src/app/teachers/[id]/page.js`

Features:

- Large photo + header info
- Full bio
- Complete specialties list
- Qualifications
- "Select This Teacher" CTA button
- "Back to Teachers" link

---

### **Step 5️⃣: Update Enrollment Form** (15 mins)

**File**: `/src/app/programs/page.js`

Add:

- "Preferred Educator" dropdown in enrollment form
- Option for "No preference / I'll decide later"
- Link to browse all teachers

---

### **Step 6️⃣: Add Teacher Selection State** (10 mins)

Handle teacher selection with URL params:

- Click teacher → goes to `/programs?teacher=rajesh-kumar`
- Pre-select that teacher in enrollment dropdown
- Allow changing selection

---

## 🎨 User Flow

```
┌─────────────────────────────────────────────────────┐
│ 1. Student clicks "Meet Our Teachers" in nav       │
│    or "Browse Teachers" on Programs page           │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 2. Lands on /teachers page                         │
│    • Sees grid of all teachers                     │
│    • Clicks on a teacher card                      │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 3. Views /teachers/[id] detail page                │
│    • Reads full bio, qualifications                │
│    • Clicks "Select Dr. Kumar as My Educator"      │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 4. Redirected to /programs?teacher=rajesh-kumar    │
│    • Enrollment form opens                         │
│    • Teacher dropdown pre-selected                 │
│    • Student fills form and submits                │
└─────────────────────────────────────────────────────┘
```

---

## 💾 Data Structure

```javascript
{
  id: 'rajesh-kumar',                    // URL-friendly ID
  name: 'Dr. Rajesh Kumar',              // Full name
  title: 'Senior Robotics Educator',     // Job title
  imageUrl: '/teachers/rajesh-kumar.jpg', // Photo path
  bio: 'Long bio paragraph...',          // Full description
  specialties: [                          // Array of specialties
    'Arduino & Microcontrollers',
    'AI & Machine Learning',
    'Sensor Integration'
  ],
  qualifications: [                       // Array of qualifications
    'Ph.D. in Robotics Engineering',
    'M.Tech in Computer Science'
  ],
  experience: '15+ years',                // Experience string
  grades: ['6-8', '9-10', '11-12'],      // Grade levels taught
  availability: 'Weekdays & Weekends',    // Availability
  email: 'rajesh@robovedanta.com',       // Contact email
  featured: true,                         // Show in featured section
  active: true                            // Currently accepting students
}
```

---

## 🎯 What Client Needs to Provide

**For each teacher (5-6 total):**

1. **Full Name**
   - Example: "Dr. Rajesh Kumar"

2. **Title/Designation**
   - Example: "Senior Robotics Educator"

3. **Professional Photo**
   - Square/portrait orientation
   - High quality (at least 800x800px)
   - Professional background preferred

4. **Bio (2-3 paragraphs)**
   - Background and experience
   - Teaching philosophy
   - Achievements

5. **Specialties (3-5 items)**
   - Example: "Arduino & Microcontrollers", "AI & ML"

6. **Qualifications (3-5 items)**
   - Degrees, certifications, training

7. **Years of Experience**
   - Example: "15+ years" or "8 years"

8. **Email Address**
   - For student contact

9. **Availability**
   - Example: "Weekdays & Weekends" or "Saturdays only"

10. **Grade Levels**
    - Which grades they teach: 1-3, 4-5, 6-8, 9-10, 11-12

11. **Featured?**
    - Should this teacher be highlighted?

---

## ⏱️ Time Estimate

```
Step 1: Create data file          →  5 mins
Step 2: TeacherCard component     → 15 mins
Step 3: Browse page               → 20 mins
Step 4: Detail pages              → 25 mins
Step 5: Update enrollment form    → 15 mins
Step 6: Selection state logic     → 10 mins
Testing & polish                  → 20 mins
─────────────────────────────────────────
TOTAL:                            ~ 2 hours
```

---

## 🚀 Ready to Start!

**Next Actions:**

1. ✅ Get teacher details from client (or use placeholder data)
2. ✅ Create teacher data file
3. ✅ Build components
4. ✅ Create pages
5. ✅ Test the flow
6. ✅ Deploy!

---

## 💡 Future Upgrade Path (₹20-25K Later)

When they want to manage teachers themselves:

**Convert:**

- `teachers.js` file → MongoDB/Firebase database
- No admin panel → Full admin dashboard
- You update → They update themselves

**Your components won't change!** Just the data source.

---

Let's build this! 🎯
