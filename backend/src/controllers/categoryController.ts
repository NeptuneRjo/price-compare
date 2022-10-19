import { Request, Response } from 'express'
import { Category, Item } from '../models'

export const get_category = async (req: Request, res: Response) => {
	const items = await Item.find({ category: req.params })

	if (!items) {
		return res.status(204).json({ data: items })
	}

	res.status(200).json({ data: items })
}

export const create_category = async (req: Request, res: Response) => {
	const { name, LA, TSM, SF } = req.body

	const newCat = await Category.addNewCat(name, LA, TSM, SF)

	res.status(200).json({ data: newCat })
}
