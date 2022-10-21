import express from 'express'
import mongoose from 'mongoose'
import { itemRoutes } from './routes'
import cfg from './config'
import { scrapeLaCats } from './scrapers/laScraper'
import { scrapeSfCats } from './scrapers/sfScraper'
import { scrapeItems } from './scrapers/scraperUtils'
import cron from 'node-cron'

import './config/mongoServer'

const app = express()
const port = process.env.PORT || 4000

/* Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routes */
app.use('/api', itemRoutes)

/* Util */
process.setMaxListeners(0)

// Updates the item lists every wednesday at 12:00
cron.schedule('0 12 * * 3', async () => {
	await scrapeItems()
})

/* 
	Run these functions to populate the db with Categories and Items

	IN THIS ORDER:
	1. scrapeLaCats()
	2. scrapeSfCats()
	3. scrapeItems()

*/

// scrapeLaCats()
// scrapeSfCats()
// scrapeItems()

/* Server */
mongoose.connect(cfg.mongo.uri).then(() => {
	app.listen(port, () => {
		console.log('Connected to database and listening on port', port)
	})
})
