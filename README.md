# AI Bug Tracker

A full-stack bug tracker that uses Google Gemini to automatically set each bug's priority, category and a suggested fix.

## Features

- Register / login with JWT authentication
- Create, view, edit and delete bugs
- AI analysis on create, plus a "Re-run AI" button
- Search and filter by status, priority and category
- Dashboard statistics and color badges
- Rate limiting, Helmet and restricted CORS

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **AI:** Google Gemini API

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Environment variables (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string for signing tokens |
| `GEMINI_API_KEY` | Key from Google AI Studio |
| `GEMINI_MODEL` | Primary Gemini model |
| `GEMINI_FALLBACK_MODEL` | Fallback if the primary is overloaded |
| `CLIENT_URL` | Allowed frontend origin(s), comma separated |

Client (optional): `VITE_API_URL` (defaults to `http://localhost:5000/api`).

## API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Log in |
| GET | `/api/auth/me` | Current user |
| GET | `/api/bugs` | List bugs (`search`, `status`, `priority`, `category`) |
| GET | `/api/bugs/stats` | Dashboard counts |
| GET | `/api/bugs/:id` | One bug |
| POST | `/api/bugs` | Create bug (runs AI) |
| POST | `/api/bugs/:id/analyze` | Re-run AI |
| PUT | `/api/bugs/:id` | Update bug |
| DELETE | `/api/bugs/:id` | Delete bug |

All `/api/bugs` routes require `Authorization: Bearer <token>`.

## Author

Neeli ManiRaj