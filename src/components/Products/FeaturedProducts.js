/** @format */

import React from 'react';
import ProductList from './ProductList';
import Loading from '../Loading';
import { ProductContext } from '../../context/products';

export default function FeaturedProducts() {
	const { loading, featured } = React.useContext(ProductContext);

	if (loading) {
		return <Loading />;
	}
	return <ProductList title='featured products' products={featured} />;
}
