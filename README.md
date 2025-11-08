# OrchestraHub — Collaborative Score Annotation Platform

## 🌍 Project Overview

As sheet music moves toward digital formats, orchestras still struggle to coordinate: every musician has separate PDFs, private notes, and endless version confusion.  
**OrchestraHub** fixes that by giving conductors and musicians a shared online workspace to upload, assign, annotate, and share their scores — all in one place.

It’s a collaborative tool built for *real orchestras*, blending structure (admin/player roles) with creative freedom (annotations & uploads).

---

## 🧩 Tech Stack

- **Frontend:** React.js (Create React App)
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **File Uploads:** Multer (PDF storage)
- **Styling:** Plain CSS + Tailwind (optional)

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB (local or Atlas)

### 1️⃣ Backend Setup
```bash
cd backend
npm install
```
Create a .env file inside backend/
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/orchestra_db
JWT_SECRET=supersecret
ADMIN_EMAIL=admin@orchestrahub.com
ADMIN_PASSWORD=admin123
```
Then run
```
npm start
```

### 2️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 🎹 Features
## 👑 Admin (Conductor)

- Register/login with seeded credentials.
- Upload new Pieces with title, composer, and instrument PDFs.
- Assign each PDF (instrument part) to one or more musicians.

## 🎻 Player (Musician)

- Register/login normally (auto-role: musician).
- View assigned pieces on their dashboard.
- Open score in full-page PDF viewer.
- Annotate locally (browser PDF tools), download, and upload annotated copy back.

### 📂 Directory Structure

orchestrahub/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Piece.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── piece.js
│   ├── uploads/
│   │   └── annotations/  (stored annotated PDFs)
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.js
│   │   │   ├── PlayerDashboard.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Viewer.js
│   │   └── App.js
│   └── package.json
│
└── README.md

### 🚀 How to Run the Demo

## Start MongoDB:
``` bash
sudo systemctl start mongod
```

## Start backend:

``` base
cd backend
npm start
```

## Start frontend:
``` bash
cd frontend
npm start
```

## Login as:

- Admin: admin@orchestrahub.com / admin
- Musician: register via /register

## Follow workflow:

- Admin uploads piece → assigns players
- Player views part → annotates & uploads

### 🔮 Future Improvements

## Automatic annotation linking:
- Currently, uploaded annotated PDFs are stored successfully.
- In the next version, these will automatically associate with each player and instrument, allowing conductors to see updates instantly without page reloads.

## In-app annotation layer:
- Implement real-time annotation (using React-PDF + Canvas or PDF.js), so players can draw and type directly on their score — no need to upload.

## Version history & real-time sync:
- Add Socket.io support for live collaborative sessions and annotation version tracking.
