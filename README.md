# 📝 Task Manager Web Application

A full-stack Task Manager web application built using **FastAPI (backend)** and **Vanilla JavaScript (frontend)**.
This project allows users to register, log in, and manage their daily tasks efficiently with a clean UI and secure API.

---

## 🚀 Live Demo

* 🌐 **Frontend (Vercel):** https://task-manager-webapp-gamma.vercel.app
* ⚙️ **Backend (Render):** https://task-manager-webapp-31wl.onrender.com
* 📘 **API Documentation (Swagger):** https://task-manager-webapp-31wl.onrender.com/docs

---

## 🛠️ Tech Stack

### 🔹 Backend

* ⚡ FastAPI
* 🗄️ SQLModel (SQLAlchemy ORM)
* 🔐 JWT Authentication
* 🐍 Python

### 🔹 Frontend

* 🌐 HTML
* 🎨 CSS
* ⚙️ JavaScript (Fetch API)

### 🔹 Deployment

* 🚀 Backend → Render
* 🌍 Frontend → Vercel

---

## ✨ Features

* 👤 User Registration & Login
* 🔐 Secure authentication using JWT tokens
* 📋 Create, Read, Update, Delete (CRUD) tasks
* ✅ Mark tasks as completed / undo
* 🗑️ Delete tasks
* 🔄 Real-time updates after actions
* 📱 Simple and responsive UI

---

## 📂 Project Structure

```
task-manager-webapp/
│
├── backend/
│   ├── app/
│   │   ├── api/        # API routes (auth, tasks)
│   │   ├── core/       # database, config
│   │   ├── models/     # database models
│   │   └── main.py     # FastAPI entry point
│   │
│   └── requirements.txt
│
├── frontend/
│   └── static/
│       ├── index.html
│       ├── app.js
│       └── style.css
│
└── README.md
```

---

## ⚙️ Local Setup

### 🔹 1. Clone Repository

```
git clone https://github.com/raghul-raj-00/task-manager-webapp.git
cd task-manager-webapp
```

---

### 🔹 2. Backend Setup

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

👉 Backend runs at:
`http://127.0.0.1:8000`

---

### 🔹 3. Frontend Setup

Open:

```
frontend/static/index.html
```

OR use **Live Server** in VS Code

---

## 🔐 Environment Variables

For better security (production), use environment variables:

```
SECRET_KEY=your_secret_key
DATABASE_URL=sqlite:///./database.db
```

---

## 🌍 Deployment Guide

### 🚀 Backend (Render)

* Root Directory → `backend`
* Build Command:

  ```
  pip install -r requirements.txt
  ```
* Start Command:

  ```
  uvicorn app.main:app --host 0.0.0.0 --port 10000
  ```

---

### 🌐 Frontend (Vercel)

* Root Directory → `frontend/static`
* Framework → Other
* Auto deploy from GitHub

---

## 🔗 API Endpoints

### 🔐 Authentication

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | Register new user |
| POST   | `/auth/login`    | Login user        |

---

### 📋 Tasks

| Method | Endpoint      | Description   |
| ------ | ------------- | ------------- |
| GET    | `/tasks/`     | Get all tasks |
| POST   | `/tasks/`     | Create task   |
| PUT    | `/tasks/{id}` | Update task   |
| DELETE | `/tasks/{id}` | Delete task   |

---

## ⚠️ Important Notes

* ⚠️ SQLite database resets on Render free tier
* 🔐 CORS must allow frontend URL
* 🔗 API URL must be correctly set in frontend (`app.js`)
* 🌍 Backend and frontend are deployed separately

---

## 🧠 Challenges Faced

* Handling **CORS issues** between Vercel and Render
* Fixing API endpoint URL formatting (`//` issues)
* Deployment debugging and cache issues
* Connecting frontend and backend correctly

---

## 🚀 Future Improvements

* 🗄️ Use PostgreSQL instead of SQLite
* 🔐 Store secrets using environment variables
* 🎨 Improve UI/UX
* 📱 Add mobile responsiveness
* 🔔 Add notifications/reminders

---



* GitHub: https://github.com/raghul-raj-00

---



---

## 🎯 Conclusion

This project demonstrates a **complete full-stack development workflow**, including:

* Backend API development (FastAPI)
* Frontend integration (JavaScript)
* Authentication system (JWT)
* Deployment (Render + Vercel)
* Debugging real-world issues

---

💡 *A great project for learning real-world full-stack deployment and debugging.*
