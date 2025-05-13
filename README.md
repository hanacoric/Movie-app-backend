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

PORT=5000 <br>
MONGO_URI=your_mongodb_connection_string <br>
JWT_SECRET=your_jwt_secret <br>
VITE_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key <br>
OMDB_API_KEY=your_omdb_api_key <br>
SKIP_RECAPTCHA=true <br>

4. **Start the server**

npm run dev

## Folder Structure

movie-app-backend/<br>
│<br>
├── src/<br>
│ ├── config/ # DB & environment setup<br>
│ ├── controllers/ # Route logic<br>
│ ├── docs/ # Swagger config<br>
│ ├── middleware/ # Auth middleware<br>
│ ├── models/ # Mongoose schemas<br>
│ ├── routes/ # Express route definitions <br>
│ ├── types/ # OMDb response interfaces<br>
│ ├── utils/ # Helper functions<br>
│ ├── app.ts # Express app setup<br>
│ └── server.ts # Entry point<br>
│<br>
├── .env # Environment variables<br>
├── README.md<br>
├── package.json<br>
├── tsconfig.json<br>
