import { model, Schema, Document, Model } from 'mongoose'
import Item from './itemModel'

// Define the item that the model creates
interface CategoryDocument extends Document {
	name: string
	links: {
		LA: string
		TSM: string
		SF: string
	}
}

// Define the model itself
interface CategoryModel extends Model<CategoryDocument> {
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
		LA: { type: String, default: '', required: true },
		TSM: { type: String, default: '', required: true },
		SF: { type: String, default: '', required: true },
	},
})

// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (
	name: string,
	LA: string,
	TSM: string,
	SF: string
): Promise<CategoryDocument> {
	const newCat: CategoryDocument = await this.findOneAndUpdate(
		{
			name,
		},
		{
			links: {
				LA,
				TSM,
				SF,
			},
		},
		{ setDefaultsOnInsert: true, upsert: true }
	)

	return newCat
}

const Category: CategoryModel = model<CategoryDocument, CategoryModel>(
	'Categorie',
	categoryModel
)

export default Category
