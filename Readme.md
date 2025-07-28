# Full Stack Music App

Once you clone it make sure you run 'npm install' command to install all libraries mention in package.json file.# 🎵 MERN Stack Music Streaming Website

A full-featured, responsive **Music Streaming Website** built using the **MERN stack** with **PostgreSQL** for robust relational data management. Users can browse, play, search music, and manage playlists in a sleek and dynamic interface.

---

## 🛠️ Tech Stack

### 🖥️ Frontend
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 🧠 Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)

### 🔧 Tools & Deployment
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Render](https://img.shields.io/badge/Render-00979D?style=for-the-badge&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Features

- 🎧 Browse and play music by genre, artist, or album
- 🔍 Search functionality for tracks and artists
- 🎵 Playlist management (create, update, delete)
- 🧑 User authentication and protected routes
- 📀 Admin panel to upload and manage tracks
- 📱 Fully responsive design for all devices
- ⚙️ RESTful API using Express and PostgreSQL

---

## 📁 Project Structure

music-mern-app/
├── client/ # React frontend
│ ├── src/
│ └── public/
├── server/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/ # Sequelize Models
│ ├── routes/
│ └── server.js
├── .env
├── README.md
└── package.json

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-mern-app.git
cd music-mern-app
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=musicdb
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
🌐 Live Demo
https://siddha-sangeet.onrender.com/
