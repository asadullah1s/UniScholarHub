import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';

import universitiesRouter from './routes/universities.js';
import scholarshipsRouter from './routes/scholarships.js';
import countriesRouter from './routes/countries.js';
import searchRouter from './routes/search.js';
import { usingMongo } from './services/dataStore.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

const limiter = rateLimit({ windowMs: 60 * 1000, limit: 120, standardHeaders: true, legacyHeaders: false });
app.use('/api', limiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'UniScholarHub API is running', dataSource: usingMongo() ? 'MongoDB' : 'Local JSON' });
});

app.use('/api/universities', universitiesRouter);
app.use('/api/scholarships', scholarshipsRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/search', searchRouter);

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`UniScholarHub API server running on port ${PORT}`);
  console.log(`Data source: ${usingMongo() ? 'MongoDB' : 'local JSON'}`);
});
