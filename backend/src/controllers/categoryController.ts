import { Request, Response } from 'express'
import { Category } from '../models'

export const get_category = async (req: Request, res: Response) => {
	const name = req.params
	const category = await Category.findOne({ name })

	if (!category) {
		return res.status(404).json({ error: 'No category found with that name' })
	}

	res.status(200).json({ data: category })
}

export const get_all_categories = async (req: Request, res: Response) => {
	const categories = await Category.find({})

	if (!categories) {
		return res.status(204).json({ data: categories })
	}

	res.status(200).json({ data: categories })
}
