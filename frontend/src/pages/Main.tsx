import React, { useState, useEffect } from 'react'

import { Item } from '../components'
import { getItems } from '../api/getItems'
import { ItemInterface } from '../types'

const Main = () => {
	const [items, setItems] = useState<ItemInterface[] | null>(null)
	const [error, setError] = useState<null | string>(null)

	useEffect(() => {
		;(async () => {
			const { data, error } = await getItems()

			if (error) {
				setError(error)
			} else {
				setItems(data)
			}
		})()
	}, [])

	return (
		<div id='main-main'>
			<div id='main-items'>
				{items ? (
					items.map((item) => <Item item={item} />)
				) : (
					<div>Sorry... Nothing to display</div>
				)}
			</div>
			<div id='main-tab'></div>
		</div>
	)
}

export default Main
