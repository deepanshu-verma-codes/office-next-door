<div align="center">
  <h1>🏢 Office Next Door</h1>
  <p><strong>Hyper-local job discovery. Connect with top tech companies and startups in your immediate geographic area.</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Node.js-18.x-green.svg" alt="Node.js version" />
    <img src="https://img.shields.io/badge/Next.js-15.x-black.svg" alt="Next.js version" />
    <img src="https://img.shields.io/badge/Express-5.x-lightgrey.svg" alt="Express version" />
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  </p>
</div>

<br />

> A modern web application helping local builders connect with frontier roles in their city. Find roles perfectly aligned with your technical stack effortlessly.

---

## 📑 Table of Contents

- [Core Features](#-core-features)
- [Getting Started & Installation](#-getting-started--installation)
- [Usage & Examples](#-usage--examples)
- [Development & Contributing](#-development--contributing)
- [Credits & License](#-credits--license)

---

## ✨ Core Features

- **Local Focus**: Discover opportunities in your immediate geographic area. Cut the commute and build locally.
- **Curated Companies**: Explore verified local startups and established tech firms with modern technology stacks.
- **Smart Matching**: Find roles perfectly aligned with your modern stack skills (MERN, Next.js, TypeScript).
- **Interactive UI**: A highly polished, animated interface built with Tailwind CSS and Framer Motion.
- **Robust API Backend**: Scalable Express.js architecture with MongoDB, Redis caching, and background job processing.

---

## 🚀 Getting Started & Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas)
- [Redis](https://redis.io/) (Used for caching and BullMQ background queues)

### 1. Clone the repository

```bash
git clone https://github.com/deepanshu-verma-codes/office-next-door.git
cd office-next-door
```

### 2. Environment Configuration

Copy the `.env.example` (or use the provided `.env`) in the **root directory** and configure your keys:

```env
# Frontend Variables
NEXT_PUBLIC_API_URL=http://localhost:5050

# Backend Variables
PORT=5050
MONGO_URI=mongodb://localhost:27017/office-next-door
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_development_secret_key
```

### 3. Install Dependencies

You will need to install dependencies for both the frontend and backend.

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

---

## 💻 Usage & Examples

To run the application locally, you will need to start both the backend server and the frontend development server.

**Terminal 1: Start the Backend (Express API)**
```bash
cd backend
npm run dev
# Server will start on http://localhost:5050
```

**Terminal 2: Start the Frontend (Next.js)**
```bash
cd frontend
npm run dev
# Web app will start on http://localhost:3000
```

Open `http://localhost:3000` in your browser to view the application.

---

## 🤝 Development & Contributing

We welcome contributions from the community!

### Local Development Workflow
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/amazing-feature`.
3. Make your changes and test them locally.
4. Commit your changes: `git commit -m 'Add amazing feature'`.
5. Push to the branch: `git push origin feature/amazing-feature`.
6. Open a Pull Request.

### Bug Reports
If you find a bug or have a feature request, please open an issue in the repository outlining the expected behavior and the steps to reproduce the problem.

---

## 📜 Credits & License

**Office Next Door** is built and maintained by [Your Name/Organization].

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software.
