import { Schema, model } from 'mongoose'

const itemModel = new Schema({
	name: { type: String },
	prices: {
		LA: {
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
