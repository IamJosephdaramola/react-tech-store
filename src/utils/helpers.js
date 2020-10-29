/** @format */
// import url from './URL';

// helper functions
export function featuredProducts(data) {
	return data.filter((item) => item.featured === true);
}

export function flattenProducts(data) {
	return data.map((item) => {
		// cloudinary
		const image = item.image.url;
		// local setup no deployment
		// const image = `${url}${item.image.url}`;
		return { ...item, image };
	});
}
