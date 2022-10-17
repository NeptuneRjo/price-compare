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
})
