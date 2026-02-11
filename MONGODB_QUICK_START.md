# 🚀 Quick Setup: MongoDB Atlas (5 Minutes)

## Step 1: Create Account & Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free account)
3. Create a FREE cluster (M0)

## Step 2: Create Database User

1. In Atlas, go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Username: `robovedanta-admin`
4. Password: Generate a strong password (SAVE IT!)
5. Privileges: **"Read and write to any database"**
6. Click **"Add User"**

## Step 3: Allow Network Access

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use specific IPs
4. Click **"Confirm"**

## Step 4: Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://robovedanta-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 5: Update Your .env.local File

1. Open `.env.local` in your project root
2. Replace the placeholder with your connection string
3. **IMPORTANT:** Replace `<password>` with your actual password!
4. Add database name `robovedanta` before the `?`

**Example:**

```
MONGODB_URI=mongodb+srv://robovedanta-admin:YourActualPassword123@cluster0.abc123.mongodb.net/robovedanta?retryWrites=true&w=majority
```

## Step 6: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 7: Test It! 🎉

1. Go to http://localhost:3000/schools
2. Click "Request Curriculum"
3. Fill in the multi-step form
4. Submit registration
5. Go to http://localhost:3000/admin
6. You should see your registration!

---

## ✅ Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created (FREE M0)
- [ ] Database user created with password saved
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] `.env.local` updated with real credentials
- [ ] Password replaced in connection string
- [ ] Database name `robovedanta` added to connection string
- [ ] Dev server restarted
- [ ] Test registration works
- [ ] Admin panel shows data

---

## 🔍 Troubleshooting

### "MongooseServerSelectionError" or "ECONNREFUSED"

- Check your connection string in `.env.local`
- Verify password is correct (no < > brackets)
- Ensure IP whitelist includes your IP or 0.0.0.0/0
- Wait 1-2 minutes after creating cluster

### Data not showing in admin panel

- Check browser console for errors (F12)
- Verify API route `/api/school-registrations` works
- Check MongoDB Atlas Collections (should have `schoolRegistrations`)

### Form submission fails

- Open browser DevTools (F12) → Network tab
- Submit form and check the response
- Look for error messages in Console tab

---

## 📝 Your Connection Details

**Save these securely:**

- Cluster Name: ********\_\_\_********
- Username: robovedanta-admin
- Password: ********\_\_\_********
- Database: robovedanta
- Connection String:
  ```
  _______________________________________________
  ```

---

## 🎯 Next: Access Your Application

### Schools Registration:

http://localhost:3000/schools

### Admin Dashboard:

http://localhost:3000/admin

---

Need help? Check `SCHOOL_REGISTRATION_SETUP.md` for full documentation!
