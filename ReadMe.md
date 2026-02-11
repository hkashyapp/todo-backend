# TODO Application Backend

## Overview
A secure RESTful API for personal task management built with Node.js, Express, and MongoDB.

## Setup Instructions
1. **Install dependencies**: `npm install`
2. **Environment Variables**: Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET` like `.env.example`.
3. **Run Locally**: `npm run dev`

## Authentication Flow
1. User registers via `/auth/register` (Passwords are hashed/salted).
2. User logs in via `/auth/login` to receive a JWT.
3. The JWT must be included in the `Authorization: Bearer <token>` header for all TODO endpoints.

## Security Features
- **IDOR Protection**: Users can only access, update, or delete tasks linked to their own user ID.
- **Validation**: Input sanitization using Zod schemas.