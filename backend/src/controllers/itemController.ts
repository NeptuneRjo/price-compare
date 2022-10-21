import { Request, Response } from 'express'
import { Item } from '../models'

export const get_items = async (req: Request, res: Response) => {
	const items = await Item.find({})
	let returnArray = []

	const chunkSize = 50

	if (!items) {
		res.status(204).json({ data: undefined })
	}

	for (let i = 0; i < items.length; i += chunkSize) {
		const chunk = items.slice(i, i + chunkSize)

		returnArray.push(chunk)
	}

	res.status(200).json({ data: returnArray })
}
