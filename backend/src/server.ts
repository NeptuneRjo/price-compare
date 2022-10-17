import express from 'express'
import { connection } from 'mongoose'

import './config/mongoServer'

const app = express()
const port = process.env.PORT || 4000

connection.on('connected', () => {
	app.listen(port, () => {
		console.log('Connected to database and listening on port', port)
	})
})
