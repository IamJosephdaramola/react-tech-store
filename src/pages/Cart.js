/** @format */

import React, { useContext } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
// import {UserContext} from '../context/user'

export default function Cart() {
	const { cart, total } = useContext(CartContext);
	const { user } = useContext(UserContext);

	if (!cart || cart.length === 0) {
		return <EmptyCart />;
	}
	return (
		<section className='cart-items section'>
			<h2>your cart</h2>
			{cart &&
				cart.length > 0 &&
				cart.map((item) => <CartItem key={item.id} {...item} />)}
			<h2>total : $ {total}</h2>
			{user && user.token ? (
				<Link to='/checkout' className='btn btn-primary btn-block'>
					checkout
				</Link>
			) : (
				<Link to='/login' className='btn btn-primary btn-block'>
					login
				</Link>
			)}
		</section>
	);
}
