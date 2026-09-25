import { Router } from 'express';
import { listCountries, getCountryById } from '../controllers/countryController.js';

const router = Router();
router.get('/', listCountries);
router.get('/:id', getCountryById);

export default router;
