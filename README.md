# UniScholarHub

**Discover Universities. Find Scholarships. Apply with Confidence.**

UniScholarHub is a global university and scholarship discovery platform. Students can browse universities
country-wise, filter by scholarship availability, browse scholarship categories, and view complete
admission, eligibility, fee, and application information — then apply directly on the official university
or scholarship website.

This is an **information/discovery platform only**. It does not process applications itself; the "Apply
Now" button always redirects to the official source.

---

## 1. Technology Stack

- **Frontend:** React 18 + Vite + Tailwind CSS + React Router + lucide-react icons + react-helmet-async (SEO) + PWA support
- **Backend:** Node.js + Express
- **Data:** Local JSON files by default (no database setup required). MongoDB is optional and can be
  enabled later without changing the frontend or the API contract.
- **Cost:** 100% free and open-source. No paid APIs, no paid hosting requirement, no credit card needed.

Everything is installed locally inside the project — nothing needs to be installed globally.

---

## 2. Project Structure

```
unischolarhub/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/     # layout, university, scholarship, search, common
│   │   ├── pages/          # route-level pages
│   │   ├── services/       # API client + per-resource services
│   │   ├── utils/          # date/currency/slug helpers
│   │   └── config/         # app configuration
│   └── public/
├── server/                 # Express API
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── services/       # data access layer (JSON now, Mongo-ready)
│       └── data/           # sample university/scholarship/country JSON
├── .env.example
└── package.json             # root scripts (runs client + server together)
```

---

## 3. Installation

You only need Node.js installed (v18+). No other global tools are required.

```bash
npm run install:all
```

This installs the root, `client/`, and `server/` dependencies in one step.

---

## 4. Development

```bash
npm run dev
```

This starts the Express API (port 5000) and the Vite dev server (port 5173) together. Open
`http://localhost:5173`. The Vite dev server proxies `/api` requests to the Express server automatically.

You should see in your terminal:

```
UniScholarHub API server running on port 5000
Data source: local JSON
```

---

## 5. Environment Variables

Copy the example files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

| Variable | Location | Description |
|---|---|---|
| `PORT` | `server/.env` | API server port (default 5000) |
| `MONGODB_URI` | `server/.env` | Optional. Leave empty to use local JSON data. |
| `VITE_API_URL` | `client/.env` | API base path (default `/api`, works with the dev proxy) |
| `VITE_GOOGLE_FORM_URL` | `client/.env` | Your Google Form URL, used on the Contact page |

The application works out of the box with **no MongoDB configuration** — it runs entirely on the bundled
local JSON data in `server/src/data/`.

---

## 6. Production Build

```bash
npm run build     # builds the client into client/dist
npm start          # starts the Express API server
```

To serve the built frontend, deploy `client/dist` to any static host (Netlify, Vercel, GitHub Pages,
Render Static Site, etc. — all have free tiers) and point `VITE_API_URL` to your deployed API's URL. Or
serve both from the same Node process by adding a static file handler in `server/src/app.js` if you prefer
a single-service deployment.

---

## 7. Data Structure & Adding Universities / Scholarships

Data lives in three JSON files:

- `server/src/data/countries.json`
- `server/src/data/universities.json`
- `server/src/data/scholarships.json`

Universities reference scholarships by ID (`scholarships: ["s1", "s5"]`) rather than duplicating scholarship
data. Scholarships reference universities the same way. Countries are referenced by `country`/`countries`
IDs rather than hard-coded names, so adding a new country requires **no React component changes** — just
add an entry to `countries.json` and reference its `id` from any university or scholarship record.

**To add a university:** append an object to `universities.json` following the existing shape (see any
existing entry for the full field list — `slug`, `name`, `country`, `admissionOpenDate`,
`admissionCloseDate`, `requirements`, `programs`, `scholarships`, `fees`, `applicationProcess`, etc.).

**To add a scholarship:** append an object to `scholarships.json`, then reference its `id` from the
relevant universities' `scholarships` array (and add the university's `id` to the scholarship's
`universities` array).

⚠️ **Data accuracy:** The sample data bundled with this project is clearly marked as demo/sample data
(`source` field on every record) to demonstrate the full user journey. Never present fabricated deadlines,
fees, or eligibility criteria as verified fact — always mark unverified fields as "Information not
available" and cite an official source before publishing real records.

### Enabling MongoDB later

`server/src/services/dataStore.js` is the single data-access abstraction every controller uses. To enable
MongoDB, set `MONGODB_URI` in `server/.env` and replace the JSON-reading functions in that file with
MongoDB queries — no controller, route, or frontend code needs to change.

---

## 8. API Documentation

See [`API.md`](./API.md).

---

## 9. Changing the Google Form URL

Update `VITE_GOOGLE_FORM_URL` in `client/.env` (see `client/.env.example`). The Contact page's
"Contact Now" button reads this value automatically.

---

## 10. Key User Journey

```
Home → Select Country → Universities in that Country → Scholarship Available filter
  → Scholarship Category → Select Scholarship → Universities offering it → University Details
  → Eligibility → Scholarship Details → Fees → Application Steps → Important Dates
  → Apply Now → Official University / Scholarship Website
```

This flow works end-to-end with the bundled sample data.

---

## 11. Disclaimer

UniScholarHub is an independent information platform. University admission dates, fees, scholarship
availability and requirements may change. Always verify important information on the official university
or scholarship provider website before applying. UniScholarHub is not affiliated with, authorized by, or an
official partner of any university or scholarship provider.
