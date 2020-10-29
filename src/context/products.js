/** @format */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { featuredProducts, flattenProducts } from '../utils/helpers';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [featured, setFeatured] = useState([]);

	useEffect(() => {
		getProducts();
	}, []);

	const getProducts = async () => {
		try {
			setLoading(true);
			const res = await axios(`${process.env.REACT_APP_URL}/products`);
			const products = flattenProducts(res.data);
			const featuredItems = featuredProducts(products);
			setProducts(products);
			setFeatured(featuredItems);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};
	return (
		<ProductContext.Provider value={{ loading, products, featured }}>
			{children}
		</ProductContext.Provider>
	);
}
