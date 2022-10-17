import { connect, connection } from 'mongoose'
import cfg from '../config'

connect(cfg.mongo.uri)

connection.on('error', console.error.bind(console, 'Mongo connection error'))
