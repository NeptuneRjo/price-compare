export const fakeCategoryPass = {
	name: 'Fish',
	links: {
		LA: 'https://google.com',
		TSM: 'https://example.com',
		SF: 'https://mozilla.com',
	},
}

export const fakeCategoryFail = {
	name: 1,
	links: {
		LA: 'https://google.com',
		TSM: 'https://google.com',
	},
}

export const fakeItemPass = {
	name: 'Fish',
	prices: {
		LA: {
			price: '$1',
			ref: 'https://google.com',
		},
		TSM: {
			price: '$1',
			ref: 'https://example.com',
		},
		SF: {
			price: '$1',
			ref: 'https://mozilla.com',
		},
	},
}

export const fakeItemFail = {
	name: 1,
	prices: {
		LA: {
			price: 1,
			ref: 'https://google.com',
		},
		TSM: {
			price: '$1',
			ref: 'https://example.com',
		},
		SF: {
			price: '$1',
			ref: 'https://mozilla.com',
		},
	},
}
