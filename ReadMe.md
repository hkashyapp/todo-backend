# Todo Backend API

A production-ready REST API for managing todos with authentication, authorization, and role-based access control. Built with Node.js, Express 5, MongoDB, and JWT.

This project focuses on security, clean structure, and real-world backend practices suitable for portfolio or production use.

---

## Overview

This API allows users to register, log in, and manage their own todos securely. It uses JWT-based authentication with access and refresh tokens, protects against common vulnerabilities like IDOR, and applies validation and rate limiting across endpoints.

---

## Features

- User registration, login, and logout  
- Access and refresh token system (short-lived access tokens, long-lived refresh tokens)  
- Role-based access control (user and admin)  
- Secure password hashing with bcrypt  
- Full Todo CRUD operations  
- Owner-scoped access to prevent unauthorized data access  
- Input validation using Zod  
- Security headers via Helmet  
- Rate limiting for API and auth routes  
- Configurable CORS policy  
- Ready-to-use Postman collection with token automation  

---

## Tech Stack

### Runtime
- Node.js (ES Modules)

### Framework
- Express 5

### Database
- MongoDB Atlas with Mongoose

### Authentication
- JSON Web Tokens (jsonwebtoken)  
- bcrypt  

### Validation
- Zod  

### Security
- Helmet  
- CORS  
- express-rate-limit  

### Logging
- Morgan  

---

## Getting Started

### Prerequisites

- Node.js v18 or higher  
- MongoDB Atlas account or local MongoDB  
- npm v9 or higher  

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/todo-backend.git
cd todo-backend
npm install
Update .env
npm run dev
npm start
API_BASE_URI: http://localhost:5000/api/v1

