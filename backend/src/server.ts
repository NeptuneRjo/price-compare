import express from 'express'
import mongoose from 'mongoose'
import { categoryRoutes } from './routes'
import cfg from './config'
import { scrapeLaItems } from './scrapers/laScraper'
import { scrapeSfItems } from './scrapers/sfScraper'
import { Category } from './models'
import { scrapeItems } from './scrapers/scraperUtils'
import cron from 'node-cron'

import './config/mongoServer'

const app = express()
const port = process.env.PORT || 4000

/* Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routes */
app.use('/api/categories', categoryRoutes)

/* Util */
process.setMaxListeners(0)

// Updates the item lists every wednesday at 12:00
cron.schedule('0 12 * * 3', async () => {
	await scrapeItems()
})

// Run to setup db with items
// scrapeItems()

/* Server */
mongoose.connect(cfg.mongo.uri).then(() => {
	app.listen(port, () => {
		console.log('Connected to database and listening on port', port)
	})
})
