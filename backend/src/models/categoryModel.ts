import { model, Schema, Document, Model } from 'mongoose'
import Item from './itemModel'

// Define the item that the model creates
export interface CategoryDocument extends Document {
	name: string
	links: {
		LA: string
		TSM: string
		SF: string
	}
	items: typeof Item[]
}

// Define the model itself
export interface CategoryModel extends Model<CategoryDocument> {
	addNewCat(
		name: string,
		LA: string,
		TSM: string,
		SF: string
	): Promise<CategoryDocument>
}

const categoryModel: Schema = new Schema({
	name: { type: String, required: true },
	links: {
		LA: { type: String, required: true },
		TSM: { type: String, required: true },
		SF: { type: String, required: true },
	},
	items: { type: Array, required: true },
})

// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (
	name: string,
	LA: string,
	TSM: string,
	SF: string
): Promise<CategoryDocument> {
	const exists = await this.findOne({ name })

	if (exists) throw Error('A category already exists with this name.')

	const newCat: CategoryDocument = await this.create({
		name,
		links: {
			LA,
			TSM,
			SF,
		},
		items: [],
	})

	return newCat
}

const Category: CategoryModel = model<CategoryDocument, CategoryModel>(
	'Categorie',
	categoryModel
)

export default Category
