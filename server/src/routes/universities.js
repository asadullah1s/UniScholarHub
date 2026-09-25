import { Router } from 'express';
import { listUniversities, getUniversityBySlug } from '../controllers/universityController.js';

const router = Router();
router.get('/', listUniversities);
router.get('/:slug', getUniversityBySlug);

export default router;
