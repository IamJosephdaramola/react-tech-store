/** @format */

// submit order
import axios from 'axios';

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
	const response = await axios
		.post(
			`${process.env.REACT_APP_URL}/orders`,
			{ name, total, items, stripeTokenId },
			{
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			}
		)
		.catch((err) => console.log(err));
	return response;
}

export default submitOrder;
