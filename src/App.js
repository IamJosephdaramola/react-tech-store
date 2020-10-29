/** @format */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Error from './pages/Error';
// components
import Header from './components/Header';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
	return (
		<Router>
			<Header />
			<Alert />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/about' component={About} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/cart' component={Cart} />
				<PrivateRoute exact path='/checkout'>
					<Checkout />
				</PrivateRoute>
				<Route exact path='/products' component={Products} />
				<Route exact path='/products/:id' component={ProductDetails} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
}
