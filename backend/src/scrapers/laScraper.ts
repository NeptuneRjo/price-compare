import puppeteer from 'puppeteer'
import Category from '../models/categoryModel'
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

	for (let i = 0; i < itemNames.length; i++) {
		const item = await Item.findOne({ name: itemNames[i] })

		if (!item) {
			await Item.create({
				name: itemNames[i],
				prices: {
					SF: {
						price: ' ',
						ref: ' ',
					},
					LA: {
						price: itemPrices[i],
						ref: `https://www.liveaquaria.com${itemLinks[i]}`,
					},
				},
			})
		} else {
			await Item.findOneAndUpdate(
				{ name: itemNames[i] },
				{
					prices: {
						SF: item?.prices?.SF,
						LA: {
							price: itemPrices[i],
							ref: `https://www.liveaquaria.com${itemLinks[i]}`,
						},
					},
				},
				{
					upsert: true,
				}
			)
		}
	}

	return
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
