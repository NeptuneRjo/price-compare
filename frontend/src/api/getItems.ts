export const getItems = async () => {
	const response = await fetch(`http://localhost:4000/api/items`)
	const json = await response.json()

	if (response.status !== 204) {
		return { data: json.data, error: null }
	} else {
		return { data: null, error: 'No items found' }
	}
}
