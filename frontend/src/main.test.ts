import { describe, expect, test } from '@jest/globals'
import { searchItems } from './pages/Main'
import { getItems } from './api/getItems'
import { ItemInterface } from './types'

const MOCK_ITEM = {
	name: 'Fish',
	prices: {
		LA: {
			price: 'test1',
			ref: 'ref1',
		},
		SF: {
			price: 'test2',
			ref: 'ref2',
		},
	},
}

const unmockedFetch = global.fetch

const mockFetch = async (data: object) => {
	global.fetch = jest
		.fn()
		.mockImplementation(
			jest.fn(() =>
				Promise.resolve({ json: () => Promise.resolve(data) })
			) as jest.Mock
		)
}

describe('Main', () => {
	afterAll(() => {
		global.fetch = unmockedFetch
	})

	describe('API', () => {
		it('returns the data as the array of items', async () => {
			mockFetch({ data: [MOCK_ITEM] })

			const response = await getItems()
			expect(response).toEqual({ data: [MOCK_ITEM], error: null })
		})
	})

	describe('search', () => {
		it('returns the item if the name matches', async () => {
			const searchParam = ['name']
			const items = searchItems([MOCK_ITEM], searchParam, 'Fish')

			expect(items).toEqual([MOCK_ITEM])
		})

		it('does not return the item if the name does not match', async () => {
			const searchParam = ['name']
			const items = searchItems([MOCK_ITEM], searchParam, 'bar')

			expect(items).not.toEqual([MOCK_ITEM])
		})
	})
})
