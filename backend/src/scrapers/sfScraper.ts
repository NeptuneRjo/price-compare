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

export const scrapeSfItems = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`${url}?rp=200`)
	await page.setViewport({
		height: 5000,
		width: 1920,
	})

	const itemNames = await page.$$eval(
		'h3.listing-item-title a.text-white',
		(names) => {
			const innerText = names.map((index) => (index as HTMLElement).innerText)

			let cleansedArray = []

			for (let text of innerText) {
				const removeApost = text.replace(/[']/g, '')
				const removeDash = removeApost.replace('-', ' ')
				const removeColon = removeDash.split(':')
				const removeDouble = removeColon[0].split(/  +/g)

				cleansedArray.push(removeDouble[0])
			}

			return cleansedArray
		}
	)

	const itemPrices = await page.$$eval('h5.listing-item-price a', (prices) => {
		const innerText = prices.map((index) => (index as HTMLElement).innerText)

		let splitArray = []

		for (let text of innerText) {
			const removeText = text.replace('Sale: ', '')
			const splitText = removeText.split(' ')

			splitArray.push(splitText[2])
		}

		return splitArray
	})

	const itemLinks = await page.$$eval(
		'h3.listing-item-title a.text-white',
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
						price: itemPrices[i],
						ref: `https://www.saltwaterfish.com${itemLinks[i]}`,
					},
					LA: {
						price: ' ',
						ref: ' ',
					},
				},
			})
		} else {
			await Item.findOneAndUpdate(
				{ name: itemNames[i] },
				{
					prices: {
						LA: item?.prices?.LA,
						SF: {
							price: itemPrices[i],
							ref: `https://www.saltwaterfish.com${itemLinks[i]}`,
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

export const scrapeSfCats = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`https://www.saltwaterfish.com/categorylist-saltwater-fish`)
	await page.setViewport({
		height: 5000,
		width: 1920,
	})

	const catLinks = await page.$$eval(
		'html body div#canvas main.listing-page.category-listing-page section.py-5 div.container div.row div.col-6.col-sm-4.col-md-3 div.card.mb-3.border-0.listing-item div.card-body.p-0 a',
		(names) => {
			const href = names.map((index) =>
				(index as HTMLElement).getAttribute('href')
			)

			return href
		}
	)

	for (let i = 0; i < catLinks.length; i++) {
		await Category.findOneAndUpdate(
			{ name: 'SaltwaterFish' },
			{
				$push: {
					links: `https://www.saltwaterfish.com${catLinks[i]}`,
				},
			},
			{ setDefaultsOnInsert: true, upsert: true }
		)
	}
}
