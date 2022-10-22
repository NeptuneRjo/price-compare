export const getItems = async () => {
	const response = await fetch(`/api/items`)
	const json = await response.json()

	if (response.status !== 204) {
		return { data: json.data, error: null }
	} else {
		return { data: undefined, error: 'No items found' }
	}
}
