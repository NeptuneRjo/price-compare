import React from 'react'
import { ItemInterface } from '../types'

type Props = {
	item: ItemInterface
}

const Item: React.FC<Props> = ({ item }: Props) => {
	const { name, prices } = item

	return (
		<tr className='w-100' id='item'>
			<td className='w-50'>
				<h5>{name}</h5>
			</td>
			<td className='d-flex' id='item-links'>
				{prices.LA.price.length > 1 ? (
					<td className='d-flex w-50'>
						<a
							className='a-enabled text-decoration-none'
							href={prices.LA.ref}
							target='_blank'
						>
							{prices.LA.price} on LiveAquaria
						</a>
					</td>
				) : (
					<td className='d-flex w-50  text-secondary'>
						<a className='a-disabled text-decoration-none'>
							$--.-- on LiveAquaria
						</a>
					</td>
				)}
				{prices.SF.price.length > 1 ? (
					<td className='d-flex w-50'>
						<a
							className='a-enabled text-decoration-none'
							href={prices.SF.ref}
							target='_blank'
						>
							{prices.SF.price} on SaltwaterFish
						</a>
					</td>
				) : (
					<td className='d-flex w-50'>
						<a className='a-disabled  text-secondary text-decoration-none'>
							$--.-- on SaltwaterFish
						</a>
					</td>
				)}
			</td>
		</tr>
	)
}

export default Item
