# BlogPost Fullstack App

A simple fullstack blog application with a React + Vite frontend and an Express + MongoDB backend.

## Repository Structure

- `backend/` - Express API server
  - `server.js` - main backend entry point
  - `config/db.js` - MongoDB connection
  - `controllers/` - request handlers for authentication and posts
  - `middleware/` - authentication and admin authorization
  - `models/` - Mongoose schemas for users and posts
  - `routes/` - API route definitions for auth and posts
- `frontend/` - React app built with Vite
  - `src/` - React components and application logic
  - `public/` - static assets
  - `package.json` - frontend dependencies and scripts

## Features

- User registration and login
- JWT cookie-based authentication
- Protected API routes for profile and posts
- Admin-only creation and deletion of posts
- Frontend routes for register, login, posts list, single post, and create post

## Prerequisites

- Node.js 18+ (or compatible)
- npm
- MongoDB instance or MongoDB Atlas cluster

## Environment Variables

Create a `.env` file inside `backend/` with at least:

```env
MOGNO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=8000
```

> Note: The backend uses `MOGNO_URI` as the MongoDB connection variable.

## Installation

Install dependencies for both the frontend and backend:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

### Backend

From `backend/`:

```bash
npm run dev
```

This starts the API server on `http://localhost:8000`.

### Frontend

From `frontend/`:

```bash
npm run dev
```

This starts the React app on `http://localhost:5173`.

## API Endpoints

### Authentication

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and set JWT cookie
- `GET /api/auth/users` - get all users (requires auth)
- `GET /api/auth/profile` - get authenticated user profile
- `POST /api/auth/logout` - logout and clear cookie

### Posts

- `GET /posts` - list all posts (requires auth)
- `POST /posts` - create a post (requires auth + admin)
- `GET /posts/:id` - get a single post (requires auth)
- `DELETE /posts/:id` - delete a post (requires auth + admin)

## Notes

- Frontend and backend communicate via CORS with credentials enabled.
- The backend expects the frontend at `http://localhost:5173` by default.
- Admin restrictions are enforced in `backend/middleware/isAdmin.js`.

## License

This repository does not specify a license.
