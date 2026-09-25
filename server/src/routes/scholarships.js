import { Router } from 'express';
import { listScholarships, getScholarshipBySlug, listCategories } from '../controllers/scholarshipController.js';

const router = Router();
router.get('/categories', listCategories);
router.get('/', listScholarships);
router.get('/:slug', getScholarshipBySlug);

export default router;
