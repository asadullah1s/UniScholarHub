# UniScholarHub API Documentation

Base URL (development): `http://localhost:5000/api`
The client dev server proxies `/api` to this base automatically.

All responses follow a consistent envelope:

**Success**
```json
{ "success": true, "data": {}, "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 } }
```
`pagination` is included only on list endpoints.

**Error**
```json
{ "success": false, "message": "University not found" }
```

---

## GET /api/health

Health check. Returns whether the API is running on local JSON or MongoDB.

```json
{ "success": true, "message": "UniScholarHub API is running", "dataSource": "Local JSON" }
```

---

## GET /api/countries

List all countries with a live university count.

**Response**
```json
{ "success": true, "data": [ { "id": "china", "name": "China", "code": "CN", "region": "Asia", "flag": "🇨🇳", "universityCount": 2 } ] }
```

## GET /api/countries/:id

Get a single country by ID.

---

## GET /api/universities

List universities with optional filters (all combinable) and pagination.

| Query param | Description |
|---|---|
| `country` | Country ID, e.g. `china` |
| `scholarship` | `available` \| `unavailable` |
| `degree` | e.g. `Bachelor's`, `Master's`, `PhD` |
| `field` | Matches against program names, e.g. `Computer Science` |
| `admission` | `OPEN` \| `CLOSING SOON` \| `UPCOMING` \| `CLOSED` |
| `page` | Default `1` |
| `limit` | Default `20`, max `60` |

Each university includes a computed `admissionStatus` (based on the current date vs.
`admissionOpenDate`/`admissionCloseDate`), `hasScholarship`, `scholarshipCount`, and `scholarshipSummaries`.

## GET /api/universities/:slug

Full university detail record, including embedded full scholarship objects (not just IDs).

Returns `404` with `{ "success": false, "message": "University not found" }` if the slug doesn't exist.

---

## GET /api/scholarships

List scholarships with optional filters and pagination.

| Query param | Description |
|---|---|
| `country` | Country ID the scholarship is offered in |
| `category` | e.g. `Government`, `Fully Funded`, `Merit-Based` |
| `degree` | e.g. `Master's` |
| `page` / `limit` | Pagination |

## GET /api/scholarships/categories

Returns a de-duplicated, sorted array of every category currently in use — the frontend builds its category
filter chips from this rather than a hard-coded list.

## GET /api/scholarships/:slug

Full scholarship detail record, including `universityDetails` — the full university objects for every
university that offers this scholarship.

Returns `404` if the slug doesn't exist.

---

## GET /api/search?q=

Global search across universities, scholarships and countries. Matches are space-delimited and must all be
present (AND search) across name/city/country/program fields (universities), name/provider/type/categories
(scholarships), and name (countries).

**Response**
```json
{
  "success": true,
  "data": {
    "universities": [ { "id": "u1", "slug": "tsinghua-university", "name": "Tsinghua University", "city": "Beijing", "countryName": "China", "countryId": "china" } ],
    "scholarships": [ { "id": "s1", "slug": "csc-scholarship", "name": "Chinese Government Scholarship (CSC)", "provider": "China Scholarship Council" } ],
    "countries": [ { "id": "china", "name": "China" } ]
  }
}
```

---

## Errors & Rate Limiting

- All `/api/*` routes are rate-limited to 120 requests/minute per client.
- Unknown `/api/*` routes return `404` with `{ "success": false, "message": "API route not found" }`.
- Unhandled server errors return `500` with `{ "success": false, "message": "Something went wrong. Please try again." }`.
