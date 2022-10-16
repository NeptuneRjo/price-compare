import { Category } from '../../models'
import {
	initializeMongoServer,
	deinitializeMongoServer,
	dropCollections,
} from '../config/mongoMemoryServer'

import 'jest'

describe('Category Model', () => {
	beforeAll(async () => {
		await initializeMongoServer()
	})

	afterAll(async () => {
		await deinitializeMongoServer()
	})

	afterEach(async () => {
		await dropCollections()
	})
})
