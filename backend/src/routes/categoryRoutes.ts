import { Router } from 'express'
import { get_all_categories, get_category } from '../controllers'

const router = Router()

// /api/categories

router.route('/category/:id').get(get_category)
router.route('/').get(get_all_categories)

export default router
