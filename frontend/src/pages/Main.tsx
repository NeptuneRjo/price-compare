import React, { useState, useEffect } from 'react'

import { Item } from '../components'
import { getItems } from '../api/getItems'
import { ItemInterface } from '../types'

import { Table, Form, Spinner } from 'react-bootstrap'

import ReactPaginate from 'react-paginate'

export const searchItems = (
	items: ItemInterface[],
	searchParam: string[],
	query: string
) => {
	return items.filter((item) => {
		return searchParam.some((newItem) => {
			return (
				item[newItem as keyof ItemInterface]
					.toString()
					.toLowerCase()
					.indexOf(query.toLocaleLowerCase()) > -1
			)
		})
	})
}

const Main = () => {
	const [loading, setLoading] = useState<boolean>(true)

	const [items, setItems] = useState<ItemInterface[]>([])
	const [error, setError] = useState<null | string>(null)

	const [currentItems, setCurrentItems] = useState<ItemInterface[]>([])
	const [pageCount, setPageCount] = useState<number>(0)
	const [itemOffset, setItemOffset] = useState<number>(0)
	const [itemsPerPage, setItemsPerPage] = useState<number>(24)

	const [searchParam] = useState(['name'])
	const [q, setQ] = useState('')

	useEffect(() => {
		;(async () => {
			const { data, error } = await getItems()

			if (error) {
				setError(error)
			} else {
				setItems(data)
				setLoading(false)
			}
		})()
	}, [])

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage

		const filteredItems = searchItems(items, searchParam, q)

		setCurrentItems(filteredItems.slice(itemOffset, endOffset))
		setPageCount(Math.ceil(filteredItems.length / itemsPerPage))
	}, [itemOffset, itemsPerPage, items, q])

	const handlePageClick = (event: any) => {
		const newOffset = (event.selected * itemsPerPage) % items.length

		setItemOffset(newOffset)
	}

	return (
		<div id='main-main' className='d-flex'>
			<div id='main-tab' className='w-25 p-2 pt-3'>
				<Form.Control
					type='input'
					onChange={(e) => setQ(e.target.value)}
					value={q}
					placeholder='Search'
				/>
				<Form.Select
					aria-label='Choose the number of items on the page'
					onChange={(e) => setItemsPerPage(Number(e.target.value))}
					className='color-dark'
				>
					<option value={24}>24</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
					<option value={250}>250</option>
				</Form.Select>
				<div id='main-paginate'>
					<ReactPaginate
						breakLabel='...'
						nextLabel='NEXT >'
						onPageChange={handlePageClick}
						pageRangeDisplayed={0}
						pageCount={pageCount}
						previousLabel='< PREVIOUS'
						renderOnZeroPageCount={undefined}
					/>
				</div>
			</div>
			<div id='main-content' className='w-100 p-3'>
				<div
					id='main-items'
					className='d-flex justify-content-center align-items-center min-vh-100'
				>
					{!loading ? (
						<Table
							className='oveflow-auto w-50 flex-grow-1'
							id='table'
							variant='primary'
						>
							{currentItems.length > 0 ? (
								currentItems.map((item, key) => <Item item={item} key={key} />)
							) : (
								<div>Sorry... Nothing to display</div>
							)}
						</Table>
					) : (
						<Spinner animation='border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					)}
				</div>
			</div>
		</div>
	)
}

export default Main
