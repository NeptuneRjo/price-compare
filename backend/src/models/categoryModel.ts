import { model, Schema, Document, Model } from 'mongoose'

// Define the item that the model creates
export interface CategoryDocument extends Document {
	name: string
	LAurl: string
	TSMurl: string
	SFurl: string
}

// Define the model itself
export interface CategoryModel extends Model<CategoryDocument> {
	addNewCat(
		name: string,
		LAurl: string,
		TSMurl: string,
		SFurl: string
	): Promise<void>
}

const categoryModel: Schema = new Schema({
	name: { type: String, required: true },
	links: {
		LA: { type: String, required: true },
		TSM: { type: String, required: true },
		SF: { type: String, required: true },
	},
})

// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (
	name: string,
	LAurl: string,
	TSMurl: string,
	SFurl: string
): Promise<void> {
	const exists = await this.findOne({ name })

	if (exists) throw Error('A category already exists with this name.')

	const newCat = await this.create({
		name,
		links: {
			LA: LAurl,
			TSM: TSMurl,
			SF: SFurl,
		},
	})
}

const Category: CategoryModel = model<CategoryDocument, CategoryModel>(
	'Categorie',
	categoryModel
)

export default Category
