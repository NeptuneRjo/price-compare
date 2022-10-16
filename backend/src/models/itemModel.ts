import { Schema, model } from 'mongoose'

const itemModel = new Schema({
	name: { type: String },
	prices: {
		LA: {
			price: { type: String },
			ref: { type: String },
		},
		TSM: {
			price: { type: String },
			ref: { type: String },
		},
		SF: {
			price: { type: String },
			ref: { type: String },
		},
	},
})

const Item = model('Item', itemModel)

export default Item
