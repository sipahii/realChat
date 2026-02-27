# React 19 + Vite + Tailwind CSS

A modern React 19 project with Vite and Tailwind CSS v4.

## Stack

- **React 19** – Latest React with improved compiler and features
- **Vite 6** – Fast dev server and optimized production builds
- **Tailwind CSS v4** – Utility-first CSS with the official Vite plugin

## Setup

```bash
cd react-app
npm install
```

## Commands

| Command   | Description              |
| --------- | ------------------------ |
| `npm run dev`     | Start dev server (with HMR) |
| `npm run build`   | Production build           |
| `npm run preview` | Preview production build   |

## Project structure

```
react-app/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Root component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles (Tailwind import)
├── index.html
├── vite.config.js   # Vite + Tailwind plugin
└── package.json
```

Tailwind is configured via the `@tailwindcss/vite` plugin; no `tailwind.config.js` is required. Add custom theme or content in CSS with `@theme` if needed.
# realChat
