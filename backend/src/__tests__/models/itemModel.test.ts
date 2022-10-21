import { Item } from '../../models'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoMemoryServer'

import 'jest'
import { fakeItemFail, fakeItemPass } from '../fixtures'

describe('Item Model', () => {
	beforeAll(async () => {
		await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})

	it('creates a new Item', async () => {
		const newItem = await Item.create(fakeItemPass)
		const { _id, name, prices } = newItem

		expect(_id).toBeDefined()
		expect(name).toEqual(fakeItemPass.name)
		expect(prices?.LA).toEqual(fakeItemPass.prices.LA)
		expect(prices?.SF).toEqual(fakeItemPass.prices.SF)

		expect(prices?.SF).not.toEqual(fakeItemPass.prices.LA)
	})

	it('fails to create a new Item with no content provided', async () => {
		try {
			const newItem = new Item()
			await newItem.validate()
		} catch (error) {
			expect(error).not.toBeNull()
		}
	})

	it('fails to create a new Item with incorrect fields', async () => {
		try {
			const newItem = new Item(fakeItemFail)
			await newItem.validate()
		} catch (error) {
			expect(error).not.toBeNull()
		}
	})
})
