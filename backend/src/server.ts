import express from 'express'
import { connection } from 'mongoose'

import './config/mongoServer'
import { categoryRoutes } from './routes'

const app = express()
const port = process.env.PORT || 4000

/* Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Routes */
app.use('/api/categories', categoryRoutes)

/* Server */
connection.on('connected', () => {
	app.listen(port, () => {
		console.log('Connected to database and listening on port', port)
	})
})
