# Anshuman Kar — Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, and an Express backend.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Features

- Aurora WebGL hero background
- About, Skills, Projects, and Experience sections
- Contact form with Express API (messages saved locally to `server/data/messages.json`)
- Responsive dark theme UI
- Vite dev proxy for API requests

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, OGL |
| Backend | Node.js, Express 5, CORS |
| Tooling | ESLint, Concurrently |

## Quick Start

### Prerequisites

- Node.js 18+ (20 recommended)
- npm

### Installation

```bash
git clone https://github.com/AnshumanKar575/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001

### Environment

Copy `.env.example` to `.env` to customize ports:

```env
PORT=3001
CLIENT_URL=http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend + backend together |
| `npm run dev:client` | Vite dev server only |
| `npm run dev:server` | Express API only |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm start` | Start Express server (production) |

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | List saved messages |

## Project Structure

```
portfolio/
├── public/              # Static assets (favicon, icons)
├── server/
│   ├── data/            # Contact message storage (gitignored)
│   ├── routes/          # Express route handlers
│   └── index.js         # API entry point
├── src/
│   ├── components/      # Reusable UI and layout components
│   ├── data/            # Projects, skills, experience content
│   ├── sections/        # Page sections (Hero, About, etc.)
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Customize

- **Personal info:** `src/sections/About.jsx`, `Hero.jsx`, `Contact.jsx`
- **Projects:** `src/data/projects.js`
- **Skills:** `src/data/skills.js`
- **Experience:** `src/data/experience.js`
- **Social links:** `src/components/layout/Footer.jsx`

## Deployment

Build the frontend for static hosting:

```bash
npm run build
```

The output is in `dist/`. Deploy the Express API separately if you want the contact form to work in production.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

**Anshuman Kar**

- Email: anshumankar575@gmail.com
=======
# portfolio
>>>>>>> 42987de6b5a5eba23ae1fad2c8e025b811354f93
