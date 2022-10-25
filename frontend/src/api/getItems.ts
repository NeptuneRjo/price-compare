export const getItems = async () => {
	const response = await fetch(`https://price-compare.onrender.com/api/items`, {
		credentials: 'same-origin',
	})
	const json = await response.json()

	if (response.status !== 204) {
		return { data: json.data, error: null }
	} else {
		return { data: null, error: 'No items found' }
	}
}
