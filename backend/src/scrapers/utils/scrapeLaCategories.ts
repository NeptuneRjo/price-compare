import puppeteer from 'puppeteer'
import Category from '../../models/categoryModel'

export const scrapeLaCats = async () => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	await page.goto(`https://www.liveaquaria.com/category/15/marine-fish`)
	await page.setViewport({
		height: 5000,
		width: 1920,
	})

	const catNames = await page.$$eval(
		'div.category-list div.category-item a.cat-name.categorypage-ev-tracking',
		async (names) => {
			return names.map((index) => (index as HTMLElement).innerText)
		}
	)

	const catLinks = await page.$$eval(
		'div.category-list div.category-item a.cat-name.categorypage-ev-tracking',
		(names) => {
			const href = names.map((index) =>
				(index as HTMLElement).getAttribute('href')
			)

			return href
		}
	)

	for (let i = 0; i < catNames.length; i++) {
		const links: any = catLinks[i]

		if (i > 4) {
			await Category.findOneAndUpdate(
				{ name: catNames[i] },
				{
					$push: {
						links: {
							LA: `https://www.liveaquaria.com/category/15/marine-fish${links}`,
						},
					},
				},
				{ setDefaultsOnInsert: true, upsert: true }
			)
		}
	}
}
