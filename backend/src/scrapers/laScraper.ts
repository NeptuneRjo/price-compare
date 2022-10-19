import puppeteer from 'puppeteer'
import Category from '../models/categoryModel'
import fs from 'fs/promises'
import { Item } from '../models'

type Item = {
	name: string
	prices: {
		LA: {
			price: string
			ref: string
		}
		TSM: {
			price: string
			ref: string
		}
		SF: {
			price: string
			ref: string
		}
	}
}

export const scrapeLaItems = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`${url}&start=1&count=200`)
	await page.setViewport({
		height: 5000,
		width: 1920,
	})

	const itemNames = await page.$$eval(
		'div.category-list div.category-item a.cat-name',
		(names) => {
			const innerText = names.map((index) => (index as HTMLElement).innerText)

			let cleansedArray = []

			for (let text of innerText) {
				const removeApost = text.replace(/[']/g, '')
				const removeDash = removeApost.replace(/[-]/g, ' ')
				const cleansedText = removeDash.replace('EXPERT ONLY', '')

				cleansedArray.push(cleansedText)
			}

			return cleansedArray
		}
	)

	const itemPrices = await page.$$eval(
		'div.category-list div.category-item div.cat-price',
		(prices) => {
			const innerText = prices.map((index) => (index as HTMLElement).innerText)

			let splitArray = []

			for (let text of innerText) {
				const splitText = text.split(' ')

				splitArray.push(splitText[2])
			}

			return splitArray
		}
	)

	const itemLinks = await page.$$eval(
		'div.category-list div.category-item a.cat-name',
		(links) => {
			const href = links.map((index) =>
				(index as HTMLElement).getAttribute('href')
			)

			return href
		}
	)

	const itemsArray = []

	for (let i = 0; i < itemNames.length; i++) {
		const item = {
			name: itemNames[i],
			prices: {
				LA: {
					price: itemPrices[i],
					ref: itemLinks[i],
				},
			},
		}

		await Item.findOneAndUpdate(
			{ name: item.name },
			{
				$push: {
					prices: {
						LA: {
							price: itemPrices[i],
							ref: itemLinks[i],
						},
					},
				},
			},
			{
				setDefaultsOnInsert: true,
				upsert: true,
			}
		)

		const itemObj = await Item.findOne({ name: item.name })

		itemsArray.push(itemObj)
	}
}

export const scrapeLaCats = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`https://www.liveaquaria.com/category/15/marine-fish`)
	await page.setViewport({
		height: 5000,
		width: 1920,
	})

	const catLinks = await page.$$eval(
		'div.category-item a.cat-name.categorypage-ev-tracking',
		(names) => {
			const href = names.map((index) =>
				(index as HTMLElement).getAttribute('href')
			)

			return href
		}
	)

	for (let i = 0; i < catLinks.length; i++) {
		if (i > 4) {
			await Category.findOneAndUpdate(
				{ name: 'LiveAquaria' },
				{
					$push: {
						links: `https://www.liveaquaria.com${catLinks[i]}`,
					},
				},
				{ setDefaultsOnInsert: true, upsert: true }
			)
		}
	}
}