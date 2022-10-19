import { Schema, model } from 'mongoose'

const itemModel = new Schema({
	name: { type: String },
	prices: {
		LA: {
			price: { type: String, default: '' },
			ref: { type: String, default: '' },
		},
		TSM: {
			price: { type: String, default: '' },
			ref: { type: String, default: '' },
		},
		SF: {
			price: { type: String, default: '' },
			ref: { type: String, default: '' },
		},
	},
})

const Item = model('Item', itemModel)

export default Item
