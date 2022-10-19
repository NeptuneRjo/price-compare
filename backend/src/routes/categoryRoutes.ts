import { Router } from 'express'
import { get_category, create_category } from '../controllers'

const router = Router()

// /api/categories

router.route('/category/:id').get(get_category)
router.route('/category/create').post(create_category)

export default router
