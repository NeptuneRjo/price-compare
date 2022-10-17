import { Schema, model } from 'mongoose'

const itemModel = new Schema({
	name: { type: String, required: true },
	prices: {
		LA: {
			price: { type: String, required: true },
			ref: { type: String, required: true },
		},
		TSM: {
			price: { type: String, required: true },
			ref: { type: String, required: true },
		},
		SF: {
			price: { type: String, required: true },
			ref: { type: String, required: true },
		},
	},
})

const Item = model('Item', itemModel)

export default Item
