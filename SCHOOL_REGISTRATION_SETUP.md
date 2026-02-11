# School Registration System - Setup Guide

## Features Implemented ✨

### 1. **10 Expert Tutors**

- Comprehensive profiles with specialties, qualifications, and experience
- Featured tutors highlighted
- Detailed view modal for each tutor

### 2. **Multi-Step Registration Flow**

- **Step 1: School Details**
  - School name, contact person, email, phone
  - Complete address (street, city, state, pincode)
  - Board affiliation (CBSE, ICSE, State Board, IB, Other)
  - Student count

- **Step 2: Tutor Selection**
  - Grid view of all 10 tutors
  - Quick overview cards with specialties
  - "View Details" for comprehensive tutor profiles
  - Select preferred tutor

- **Step 3: Quote Calculator**
  - Select grade (1-12)
  - Enter number of students
  - **Auto-calculated pricing:**
    - Grade 1: ₹1,500 per student
    - Grade 2: ₹1,700 per student
    - Grade 3: ₹1,900 per student
    - ... (adds ₹200 per grade)
    - Grade 12: ₹3,700 per student
  - Real-time quote display
  - Optional message field

### 3. **MongoDB Backend**

- All registration data stored in MongoDB
- School details, tutor selection, quote saved
- Timestamp tracking

### 4. **Admin Panel** (`/admin`)

- No authentication required (testing phase)
- **Dashboard Stats:**
  - Total registrations count
  - Pending registrations
  - Total estimated revenue
- **Registration Table:**
  - All school registrations
  - Sortable and filterable
  - View detailed information
  - Delete registrations
- **Detail View Modal:**
  - Complete school information
  - Contact details
  - Selected tutor and program details
  - Estimated quote
  - Registration timestamp

## MongoDB Setup 🔧

### Option 1: MongoDB Atlas (Recommended for production)

1. **Create a MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

5. **Get Connection String**
   - Go to "Database" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update `.env.local`**
   Open `.env.local` and replace with your connection string:

   ```
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/robovedanta?retryWrites=true&w=majority
   ```

   **Important:** Replace `<username>`, `<password>`, and cluster name!

### Option 2: Local MongoDB (for development)

1. **Install MongoDB**
   - Download from https://www.mongodb.com/try/download/community
   - Install and start MongoDB service

2. **Update `.env.local`**
   ```
   MONGODB_URI=mongodb://localhost:27017/robovedanta
   ```

## Usage Guide 📖

### For Schools (Frontend)

1. **Navigate to Schools Page**
   - Go to `/schools`
   - Click "Request Curriculum" button

2. **Fill School Details**
   - Enter all required information
   - Complete address needed
   - Click "Next"

3. **Select a Tutor**
   - Browse through 10 expert tutors
   - Click "View Details" to see full profile
   - Click on a tutor card to select them
   - Click "Next"

4. **Get Your Quote**
   - Select grade level (1-12)
   - Enter number of students
   - Quote calculates automatically
   - Add optional message
   - Click "Submit Registration"

5. **Confirmation**
   - Success message displayed
   - Team will contact within 24 hours

### For Admin

1. **Access Admin Panel**
   - Navigate to `/admin`
   - No login required (testing phase)

2. **View Dashboard**
   - See total registrations
   - Check pending count
   - View total estimated revenue

3. **Manage Registrations**
   - Click "eye" icon to view details
   - Click "trash" icon to delete
   - Use "Refresh" to reload data

4. **View Details**
   - Complete school information
   - Contact details
   - Selected tutor and program
   - Estimated quote
   - Registration date

## Pricing Structure 💰

The system uses a progressive pricing model:

- **Grade 1:** ₹1,500 per student
- **Grade 2:** ₹1,700 per student
- **Grade 3:** ₹1,900 per student
- **Grade 4:** ₹2,100 per student
- **Grade 5:** ₹2,300 per student
- **Grade 6:** ₹2,500 per student
- **Grade 7:** ₹2,700 per student
- **Grade 8:** ₹2,900 per student
- **Grade 9:** ₹3,100 per student
- **Grade 10:** ₹3,300 per student
- **Grade 11:** ₹3,500 per student
- **Grade 12:** ₹3,700 per student

**Formula:** Base price (₹1,500) + (Grade - 1) × ₹200

**Example:**

- 50 students in Grade 6
- Price per student: ₹2,500
- Total Quote: ₹1,25,000

## The 10 Tutors 👨‍🏫👩‍🏫

1. **Dr. Rajesh Kumar** - Senior Robotics Educator (Featured)
   - Arduino, AI, Sensor Integration
   - 15+ years experience

2. **Ms. Priya Sharma** - AI & Coding Specialist (Featured)
   - Python, Machine Learning, Block Coding
   - 10+ years experience

3. **Mr. Anil Verma** - Competition Coach (Featured)
   - Competition prep, Team leadership
   - 12+ years experience

4. **Dr. Neha Patel** - STEM Education Innovator
   - STEM Integration, Project-based learning
   - 14+ years experience

5. **Mr. Vikram Singh** - Hardware & Electronics Expert
   - Circuit Design, PCB, IoT
   - 11+ years experience

6. **Ms. Sarah John** - Early Learning Specialist
   - Block-based programming, Creative problem solving
   - 8+ years experience

7. **Dr. Amit Desai** - Programming Architect
   - Advanced programming, Software architecture
   - 18+ years experience

8. **Ms. Kavita Reddy** - Creative Robotics Educator
   - Design thinking, 3D modeling
   - 9+ years experience

9. **Mr. Rahul Menon** - Automation & IoT Specialist
   - IoT applications, Home automation
   - 10+ years experience

10. **Dr. Anjali Krishnan** - Research & Innovation Mentor
    - Research methodology, Innovation
    - 16+ years experience

## Database Schema 📊

### schoolRegistrations Collection

```javascript
{
  _id: ObjectId,
  schoolName: String,
  contactPerson: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,
  board: String,
  studentCount: String,
  selectedTutorId: String,
  selectedGrade: String,
  numberOfStudents: Number,
  estimatedQuote: Number,
  message: String,
  status: String (default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints 🔌

### GET `/api/school-registrations`

- Fetch all registrations
- Returns array of registration objects

### POST `/api/school-registrations`

- Create new registration
- Requires all school detail fields
- Auto-adds timestamp and status

### DELETE `/api/school-registrations?id={registrationId}`

- Delete a registration
- Returns success/failure

## Running the Application 🚀

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   - Create/update `.env.local`
   - Add MongoDB connection string

3. **Start Development Server**

   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Main site: http://localhost:3000
   - Schools page: http://localhost:3000/schools
   - Admin panel: http://localhost:3000/admin

## Premium UI Features ✨

- **Animated modals** with framer-motion
- **Multi-step progress indicator**
- **Auto-calculating quote display** with formatting
- **Comprehensive tutor cards** with hover effects
- **Detailed tutor profile modal**
- **Success confirmation** with animation
- **Admin dashboard** with stats cards
- **Responsive design** for all screen sizes
- **Premium color scheme** with accent colors
- **Smooth transitions** throughout

## Next Steps 🎯

For production deployment:

1. **Authentication**
   - Add admin authentication
   - Protect admin routes

2. **Email Notifications**
   - Send confirmation emails to schools
   - Notify admin of new registrations

3. **Status Management**
   - Allow admins to update registration status
   - Track follow-ups

4. **Export Functionality**
   - Export registrations to CSV/Excel
   - Generate reports

5. **Payment Integration**
   - Add payment gateway
   - Generate invoices

6. **Tutor Images**
   - Add real tutor photographs
   - Professional headshots

## Troubleshooting 🔍

### MongoDB Connection Issues

- Check your connection string in `.env.local`
- Verify MongoDB Atlas IP whitelist
- Ensure credentials are correct
- Check if MongoDB service is running (local)

### Missing Data

- Verify MongoDB connection is established
- Check browser console for errors
- Ensure API routes are working

### UI Issues

- Clear browser cache
- Check if all dependencies are installed
- Restart development server

## Support 💬

For issues or questions:

1. Check MongoDB Atlas connection
2. Verify all environment variables
3. Check browser console for errors
4. Review API responses in Network tab
