# ⚡ Job Tracker — Full Stack Web Application

A full-stack web application to track job applications built with **Node.js, Express, EJS, and MongoDB**.

## 🌐 Live Demo
[Click here to view live](#) <!-- We'll add this after deployment -->

## 📸 Screenshots
<!-- Add screenshots after deployment -->

## ✨ Features

- 🔐 User Registration and Login with secure password hashing
- 👤 Each user sees only their own job applications
- ➕ Add new job applications with company, role, status, date and notes
- ✏️ Edit existing applications
- 🗑️ Delete applications
- 📊 Dashboard with live stats (Total, Interviews, Selected, Rejected)
- 🔍 Filter jobs by status (Applied, Interview, Selected, Rejected)
- 🔒 Protected routes — only logged in users can access dashboard

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |
| EJS | Template engine |
| bcrypt | Password hashing |
| express-session | User session management |
| CSS | Styling |

## 📁 Project Structure
job-tracker/
├── server.js          ← Express app entry point
├── models/
│   ├── User.js        ← User schema
│   └── Job.js         ← Job schema
├── routes/
│   ├── auth.js        ← Register, Login, Logout
│   └── jobs.js        ← CRUD operations
├── middleware/
│   └── auth.js        ← Route protection
├── views/
│   ├── auth/          ← Login & Register pages
│   └── jobs/          ← Dashboard & Form pages
└── public/
└── style.css      ← Stylesheet

## 🚀 How to Run Locally

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/harshadadavhale/job-tracker.git
cd job-tracker
```

**2. Install dependencies**
```bash
npm install
```

**3. Create `.env` file in root folder**

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
PORT=3000

**4. Start the server**
```bash
npm run dev
```

**5. Open in browser**

http://localhost:3000

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| MONGO_URI | MongoDB Atlas connection string |
| SESSION_SECRET | Secret key for session encryption |
| PORT | Port number (default 3000) |

## 👨‍💻 Author

**Harsh Dadavhale**
- GitHub: [@harshadadavhale](https://github.com/harshadadavhale)

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

