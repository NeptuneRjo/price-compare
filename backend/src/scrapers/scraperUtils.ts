import { scrapeLaItems } from './laScraper'
import { scrapeSfItems } from './sfScraper'
import { Category } from '../models'

export const scrapeItems = async () => {
	const laCat = await Category.findOne({ name: 'LiveAquaria' })
	const laCatLinks = laCat?.links

	const sfCat = await Category.findOne({ name: 'SaltwaterFish' })
	const sfCatLinks = sfCat?.links

	let i = 0

	setInterval(async () => {
		if (i < laCatLinks.length) {
			await scrapeLaItems(laCatLinks[i])
			i++
		}
	}, 20000)

	setInterval(async () => {
		if (i < sfCatLinks.length) {
			await scrapeSfItems(sfCatLinks[i])
			i++
		}
	}, 20000)
}
