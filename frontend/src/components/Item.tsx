import React from 'react'
import { ItemInterface } from '../types'
import { Button } from 'react-bootstrap'

type Props = {
	item: ItemInterface
}

const Item: React.FC<Props> = ({ item }: Props) => {
	const { name, prices } = item

	return (
		<tr>
			<td>
				<p>{name}</p>
			</td>
			{prices.LA.price.length > 1 ? (
				<td>
					<div>{prices.LA.price}</div>
					<Button href={prices.LA.ref} target='_blank'>
						LiveAquaria
					</Button>
				</td>
			) : (
				<td>
					<div>$-.--</div>
					<Button disabled>LiveAquaria</Button>
				</td>
			)}
			{prices.SF.price.length > 1 ? (
				<td>
					<div>{prices.SF.price}</div>
					<Button href={prices.SF.ref} target='_blank'>
						SaltwaterFish
					</Button>
				</td>
			) : (
				<td>
					<div>$-.--</div>
					<Button disabled>SaltwaterFish</Button>
				</td>
			)}
		</tr>
	)
}

export default Item
