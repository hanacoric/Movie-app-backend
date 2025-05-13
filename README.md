# Movie Review API - Backend

This is the backend for the Movie Review fullstack application built with **Express.js**, **TypeScript**, and **MongoDB**. It provides RESTful endpoints for user authentication, movie management, reviews, and personalized movie lists.

## Live Swagger Documentation

Access the Swagger UI for API testing and documentation:

**https://movie-app-backend-ujpg.onrender.com/api-docs/#**

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT for Authentication
- Google reCAPTCHA (bypassed in test/dev via `.env`)
- Swagger

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/hanacoric/Movie-app-backend.git

```

2. **Install dependencies**

npm install

3. **Environment setup**

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
VITE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
OMDB_API_KEY=your_omdb_api_key
SKIP_RECAPTCHA=true

4. **Start the server**

npm run dev

## Folder Structure

movie-app-backend/
│
├── src/
│ ├── config/ # DB & environment setup
│ ├── controllers/ # Route logic
│ ├── docs/ # Swagger config
│ ├── middleware/ # Auth middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express route definitions
│ ├── types/ # OMDb response interfaces
│ ├── utils/ # Helper functions
│ ├── app.ts # Express app setup
│ └── server.ts # Entry point
│
├── .env # Environment variables
├── README.md
├── package.json
├── tsconfig.json
