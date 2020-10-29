/** @format */

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import EmptyCart from '../components/Cart/EmptyCart';
import {
	CardElement,
	StripeProvider,
	Elements,
	injectStripe,
} from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
	const { cart, total, clearCart } = useContext(CartContext);
	const { user, showAlert, hideAlert, alert } = useContext(UserContext);
	const history = useHistory();
	// state values
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const isEmpty = !name || alert.show;

	async function handleSubmit(e) {
		showAlert({ msg: 'submitting order... please wait' });
		e.preventDefault();

		const response = await props.stripe
			.createToken()
			.catch((err) => console.log(err));

		const { token } = response;
		if (token) {
			setError('');
			const { id } = token;
			let order = await submitOrder({
				name,
				total,
				items: cart,
				stripeTokenId: id,
				userToken: user.token,
			});

			if (order) {
				showAlert({ msg: 'your order is complete' });
				clearCart();
				history.push('/');
				return;
			} else {
				hideAlert();
				if (response.error && response.error.message) {
					setError(response.error.message);
				}
			}
		} else {
			hideAlert();
			setError(response.error.message);
		}
	}

	if (cart.length < 1) return <EmptyCart />;

	return (
		<section className='section form'>
			<h2 className='section-title'>checkout</h2>
			<form className='checkout-form'>
				<h3>
					order total : <span>${total}</span>
				</h3>
				<div className='form-control'>
					<label htmlFor='name'>name</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='stripe-input'>
					<label htmlFor='card-element'>Credit or Debit Card</label>
					<p className='stripe-info'>
						Test using this credit card : <span>4242 4242 4242 4242</span>
						<br />
						enter any 5 digits for the zip code
						<br />
						enter any 3 digits for the CVC
					</p>
				</div>
				<CardElement className='card-element' />
				{error && <p className='form-empty'>{error}</p>}
				{isEmpty ? (
					<p className='form-empty'>please fill out name field</p>
				) : (
					<button
						type='submit'
						className='btn btn-primary btn-block'
						onClick={handleSubmit}
					>
						submit
					</button>
				)}
			</form>
		</section>
	);
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
	return (
		<StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
			<Elements>
				<CardForm />
			</Elements>
		</StripeProvider>
	);
};

export default StripeWrapper;
