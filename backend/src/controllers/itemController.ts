import { Request, Response } from 'express'
import { Item } from '../models'

export const get_items = async (req: Request, res: Response) => {
	const items = await Item.find({})

	res.status(200).json({ data: items })
}
