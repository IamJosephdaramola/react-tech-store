/** @format */

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/Products/FeaturedProducts';

export default function Home() {
	return (
		<Fragment>
			<Hero>
				<Link to='/products' className='btn btn-primary btn-hero'>
					our products
				</Link>
			</Hero>
			<FeaturedProducts />
		</Fragment>
	);
}
