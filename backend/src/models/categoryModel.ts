import { model, Schema } from 'mongoose'

const categoryModel: Schema = new Schema({
	name: { type: String, required: true },
	links: { type: Array, required: true },
})

const Category = model('Category', categoryModel)

export default Category
