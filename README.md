# Job Tracker - Full Stack Web Application

A full-stack web app to track job applications built with Node.js, Express, EJS and MongoDB.

## Live Demo
Link coming soon after deployment

## Features
- User registration and login with password hashing
- Each user sees only their own jobs
- Add, edit and delete job applications
- Dashboard with stats - Total, Interviews, Selected, Rejected
- Filter jobs by status

## Tech Stack
- Node.js and Express - backend
- MongoDB Atlas and Mongoose - database
- EJS - HTML templates
- bcrypt - password hashing
- express-session - user login sessions
- CSS - styling

## How to Run

1. Clone the repo
   git clone https://github.com/harshadadavhale/job-tracker.git

2. Install packages
   npm install

3. Create .env file
   MONGO_URI=your_mongodb_uri
   SESSION_SECRET=your_secret
   PORT=3000

4. Start server
   npm run dev

5. Open browser
   http://localhost:3000

## Environment Variables
- MONGO_URI - MongoDB connection string
- SESSION_SECRET - secret key for sessions
- PORT - port number

## Author
Harshada Davhale
GitHub - https://github.com/harshadadavhale

## License
This project is open source under the MIT License