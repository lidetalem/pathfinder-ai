# Pathfinder AI

**Discover your direction.** Pathfinder is a full-stack web app that guides people through a short, adaptive questionnaire to explore two digital career paths: **content creation** and **freelancing**. It saves progress per user and ends with an explainable recommendation summary.

> **Please note:** Pathfinder is a guidance tool, not a scientific test. The question bank and scoring rules are a starting point. Results are suggestions, not guaranteed life decisions. Validate the questions with real users before promoting it widely.

---

## Features

- Google sign-in with a personalized greeting
- Pathway choice: content creator or freelancer
- Adaptive multiple-choice questionnaire
- Progress saved per user in PostgreSQL, so users can refresh or come back later
- Back and forward navigation, with an answer required to continue
- Explainable recommendation summary, plus restart
- Animated home page with floating platform and social icons
- Scrolling marquee of freelance and social platforms
- Light and dark theme with a sun/moon toggle (remembers the choice)
- Fully responsive for phone, tablet and desktop
- Contact form that stores messages in the database and emails a notification
- Health endpoint, rate limiting and secure headers on the API

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, `@react-oauth/google`, `react-icons` |
| Backend | Node.js 20+, Express, Helmet, CORS, `express-rate-limit` |
| Database | PostgreSQL on Neon (`pg`) |
| Auth | Google ID token verification, then a signed application JWT |
| Email | Resend HTTPS API (contact notifications) |
| Hosting | Vercel (frontend), Render (backend), Neon (database) |

## Project structure

```
pathfinder-ai/
├── backend/
│   ├── sql/schema.sql        # database tables
│   ├── src/
│   │   ├── server.js         # Express app and API routes
│   │   ├── auth.js           # Google token check and JWT helpers
│   │   ├── db.js             # PostgreSQL connection pool
│   │   └── questions.js      # question bank and scoring
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # screens and UI
│   │   ├── config.js         # API URL and profile links
│   │   ├── styles.css        # themes and styles
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting started (local)

### Requirements
- Node.js 20 or newer
- A free [Neon](https://neon.tech) PostgreSQL database
- A Google Cloud OAuth Web client ID

### 1. Database
1. Create a Neon project and copy the **pooled** connection string.
2. Open the Neon **SQL Editor**, paste the contents of `backend/sql/schema.sql` and run it.

### 2. Google OAuth
1. In Google Cloud Console, create an **OAuth client ID** of type **Web application**.
2. Add `http://localhost:5173` and `http://localhost` to **Authorized JavaScript origins**. No redirect URI or client secret is needed.
3. Keep the consent screen in **Testing** mode and add yourself as a test user.

### 3. Backend
```bash
cd backend
cp .env.example .env      # then fill in the values
npm install
npm run dev
```
Check `http://localhost:4000/api/health`. You should see `{"status":"ok","database":"connected"}`.

### 4. Frontend
```bash
cd frontend
cp .env.example .env      # then fill in the values
npm install
npm run dev
```
Open `http://localhost:5173`.

## Environment variables

**Backend (`backend/.env`)**

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon connection string |
| `GOOGLE_CLIENT_ID` | Google OAuth Web client ID |
| `JWT_SECRET` | Long random secret for signing tokens |
| `FRONTEND_URL` | Allowed site origins, comma-separated, no trailing slash |
| `NODE_ENV` | `production` on the server |
| `RESEND_API_KEY` | Optional. Enables contact email notifications |
| `CONTACT_TO_EMAIL` | Optional. Inbox that receives contact messages |
| `CONTACT_FROM_EMAIL` | Optional. Sender address for notifications |

**Frontend (`frontend/.env`)**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend URL, for example `http://localhost:4000` |
| `VITE_GOOGLE_CLIENT_ID` | The same Google client ID as the backend |

Generate a strong secret with:
```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Never commit real `.env` files. Only the `.env.example` files belong in the repo.

## API overview

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Server and database status |
| POST | `/api/auth/google` | No | Exchange a Google ID token for an app session |
| GET | `/api/me` | Yes | Current user |
| GET | `/api/pathways` | No | Available pathways |
| POST | `/api/assessments` | Yes | Start an assessment |
| GET | `/api/assessments/:id` | Yes | Load an assessment and its progress |
| PUT | `/api/assessments/:id/answer` | Yes | Save an answer |
| POST | `/api/assessments/:id/finish` | Yes | Finish and get the result |
| POST | `/api/assessments/:id/restart` | Yes | Restart an assessment |
| POST | `/api/contact` | No | Send a contact message (rate limited) |

## Deployment

1. **Neon:** create the database and run `backend/sql/schema.sql`.
2. **Render (backend):** create a Web Service from this repo with Root Directory `backend`, Build Command `npm install`, Start Command `npm start`. Add the backend environment variables above. Set `FRONTEND_URL` to your Vercel address (and `http://localhost:5173` for local testing).
3. **Vercel (frontend):** import the repo with Root Directory `frontend`, framework Vite, build command `npm run build`, output directory `dist`. Add `VITE_API_URL` (your Render URL) and `VITE_GOOGLE_CLIENT_ID`.
4. **Google:** add the Vercel address to **Authorized JavaScript origins** on your OAuth client.
5. Pushing to `main` redeploys both services automatically.

**Notes**
- Free hosting tiers can change. Check current limits before relying on them for production.
- Free Render web services sleep when idle, so the first request after a break can take a while.
- Free Render web services also block outbound SMTP, which is why contact emails go through an HTTPS email API.

## Author

Built by **@lidetalem**

- LinkedIn: [lidet-alem](https://et.linkedin.com/in/lidet-alem-9a744a354)
- Telegram: [@lidetalem](https://t.me/lidetalem)

Feedback and ideas are welcome. Use the contact form on the site or reach out on Telegram.
