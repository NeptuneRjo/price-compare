import { Category } from '../../models'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoMemoryServer'

import 'jest'
import { fakeCategoryFail, fakeCategoryPass } from '../fixtures'

describe('Category Model', () => {
	beforeAll(async () => {
		await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	it('creates a new category', async () => {
		const newCategory = await Category.create(fakeCategoryPass)
		const { _id, name, links } = newCategory

		expect(_id).toBeDefined()
		expect(name).toEqual(fakeCategoryPass.name)
		expect(links?.LA).toEqual(fakeCategoryPass.links.LA)
		expect(links?.TSM).toEqual(fakeCategoryPass.links.TSM)
		expect(links?.SF).toEqual(fakeCategoryPass.links.SF)

		expect(links?.SF).not.toEqual(fakeCategoryPass.links.LA)
	})

	it('fails to create a new category with no content provided', async () => {
		try {
			const newCategory = new Category()
			await newCategory.validate()
		} catch (error) {
			expect(error).not.toBeNull()
		}
	})

	it('fails to create a new category with incorrect fields', async () => {
		try {
			const newCategory = new Category(fakeCategoryFail)
			await newCategory.validate()
		} catch (error) {
			expect(error).not.toBeNull()
		}
	})

	it('creates a new category with the static', async () => {
		const { name, links } = fakeCategoryPass

		const newCat = await Category.addNewCat(name, links.LA, links.TSM, links.SF)

		expect(newCat.name).toEqual(name)
		expect(newCat.links.LA).toEqual(links.LA)
		expect(newCat.links.TSM).toEqual(links.TSM)
		expect(newCat.links.SF).toEqual(links.SF)

		expect(newCat.links.LA).not.toEqual(links.TSM)
	})
})
