# Task Manager Web Application

A full-stack Task Management web application that allows users to create, schedule, and track tasks with category-based color coding, progress tracking, and date-wise calendar views.

Built as part of a **Full Stack Development Internship Skill Assessment**.

---

## Features

### Authentication

- User Registration & Login (JWT based)
- Each user can access **only their own tasks and categories**

### Task Management

- Create, update, delete tasks
- Task fields:
  - Title
  - Description
  - Date
  - Start & End Time
  - Progress (0–100%)
  - Status (auto-derived)
- Visual progress bar per task

### Categories

- User-defined categories
- Custom color per category
- Tasks inherit category color

### Calendar View

- Select a date from calendar
- View tasks scheduled for that date

### Live Alert

- Displays an alert when a task is currently ongoing
- Computed client-side using time comparison

---

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Calendar

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

---

## System Design Overview

- React Frontend
  | REST APIs (JWT)
  ↓
- Express Backend
  |
  ↓
  MongoDB

- Backend exposes REST APIs
- Frontend consumes APIs
- JWT used for user isolation
- Business logic separated cleanly

---

## Project Structure

GT_Assign_TaskManager/
├─ server/ # Backend (Node + Express)
└─ client/ # Frontend (React + Tailwind)

---

## Setup Instructions

### Backend

```bash
cd server
npm install
npm run dev


PORT=4000
JWT_SECRET=your_secret
MONGO_URI=mongodb://127.0.0.1:27017/GT_TaskManager


cd client
npm install
npm run dev

---

DEPLOYMENT → make it live (Render + Vercel)

How to locally run:

- cd server
- npm install
- npm run dev

- cd ..

- cd client
- npm install
- Change the baseURL to the localhost run url
- npm run dev
```
