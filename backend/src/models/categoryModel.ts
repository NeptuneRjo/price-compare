import { model, Schema } from 'mongoose'

const categoryModel = new Schema({
	name: { type: String },
	links: {
		LA: { type: String },
		TSM: { type: String },
		SF: { type: String },
	},
})

// Exists as a util function if ever needed
categoryModel.statics.addNewCat = async function (
	name: string,
	LAurl: string,
	TSMurl: string,
	SFurl: string
) {
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

const Category = model('Categorie', categoryModel)

export default Category
