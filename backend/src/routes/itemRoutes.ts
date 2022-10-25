import { Router } from 'express'
import { get_items } from '../controllers'

const router = Router()

router.route('/items').get(get_items)

export default router
