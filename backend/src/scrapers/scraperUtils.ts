import { scrapeLaItems } from './laScraper'
import { scrapeSfItems } from './sfScraper'
import { Category } from '../models'

export const scrapeItems = async () => {
	const laCat = await Category.findOne({ name: 'LiveAquaria' })
	const laCatLinks = laCat?.links

	const sfCat = await Category.findOne({ name: 'SaltwaterFish' })
	const sfCatLinks = sfCat?.links

	for (let link of laCatLinks) {
		await scrapeLaItems(link)
	}

	for (let link of sfCatLinks) {
		await scrapeSfItems(link)
	}

	// setInterval(async () => {
	// 	if (i < sfCatLinks.length) {
	// 		await scrapeSfItems(sfCatLinks[i])
	// 		i++
	// 	} else {
	// 		clearInterval()
	// 	}
	// }, 20000)
}
