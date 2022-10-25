export const getItems = async () => {
	const response = await fetch(`${process.env.REACT_APP_API_URL}/api/items`)
	const json = await response.json()

	if (response.status !== 204) {
		return { data: json.data, error: null }
	} else {
		return { data: null, error: 'No items found' }
	}
}
