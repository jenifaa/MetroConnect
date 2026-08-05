# MetroConnect Frontend

MetroConnect is a campus community web application for Metropolitan University students. It provides one place to discuss campus topics, ask academic questions, find lost items, read official announcements, and submit complaints securely.

This repository contains the React frontend. The planned backend is a Node.js/Express REST API with MongoDB, JWT authentication, and Cloudinary image storage.

## Features

- Student registration, login, profile, and protected pages
- Community posts with categories, comments, replies, likes, bookmarks, search, and reporting
- Academic questions and answers with voting
- Lost-and-found listings with search and status filters
- Anonymous or named complaint submission and status tracking
- Official announcements and notifications
- Admin dashboard for users, content, complaints, and announcements
- Responsive interface with light and dark themes

## Tech Stack

- React 19 and Vite
- React Router
- Tailwind CSS 4 and shadcn-style UI components
- Lucide React icons
- Axios for REST API requests (to be configured)

## Prerequisites

- Node.js 20 or later
- npm 10 or later
- A running MetroConnect backend for authenticated and data-driven features

## Getting Started

1. Install packages:

   ```bash
   npm install
   ```

2. Create a `.env` file from the example below:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown by Vite (normally `http://localhost:5173`).

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the app locally with hot reload. |
| `npm run build` | Produces the production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Checks the project with ESLint. |

## Project Structure

```text
src/
├── assets/                 # Images and other static imports
├── components/
│   ├── auth/               # Authentication helpers
│   ├── layout/             # Navbar, footer, and dashboard layouts
│   └── ui/                 # Reusable UI primitives
├── lib/                    # Axios client and utilities
├── pages/                  # Route-level page components
├── providers/              # Theme and future auth providers
├── routes/                 # Router definition
├── App.jsx                 # Root route layout
└── main.jsx                # Application entry point
```

See [IMPLEMENTATION.md](IMPLEMENTATION.md) for the frontend build plan, proposed routes, component organization, and backend integration contract.

## Team

**DevVerse**
CSE 323 — Web Programming Lab
Metropolitan University

## License

This is an academic project for Metropolitan University.
