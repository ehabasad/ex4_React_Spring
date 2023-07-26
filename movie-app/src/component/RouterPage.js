import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import SearchPage from './Search/SearchPage';
import CartPage from './Cart/CartPage';
import HomePage from "./Home/HomePage";
import CheckoutPage from "./CheckOut/CheckoutPage";
import CustomNavbar from "./CustomNavbar";

const RouterPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=5f227e047f00750eb748dcab752a75a3&query=${searchQuery}`
            );
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const handleAddToCart = async (movie) => {
        try {
            const response = await fetch(`/addItem/${movie.id}`, { method: 'POST' });
            if (response.ok) {
                setCartItems([...cartItems, movie]);
            } else {
                console.error('Failed to add item to cart.');
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    const handleRemoveFromCart = async (movieId) => {
        try {
            const response = await fetch(`/removeItem?itemId=${movieId}`, { method: 'POST' });
            if (response.ok) {
                const updatedCartItems = cartItems.filter((item) => item.id !== movieId);
                setCartItems(updatedCartItems);
            } else {
                console.error('Failed to remove item from cart.');
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            const response = await fetch('/resetCart', { method: 'GET' });
            if (response.ok) {
                setCartItems([]);
            } else {
                console.error('Failed to clear cart.');
            }
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const completePurchase = async (userData) => {
        try {
            // Prepare the data to send to the server
            const purchaseData = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                payment : userData.payment
            };

            // Make the API request to save the purchase data
            const response = await fetch('purchases/addPurchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(purchaseData),
            });

            if (!response.ok) {
                throw new Error('Failed to save purchase data');
            }

            // Clear the cart
            setCartItems([]);

            return response;
        } catch (error) {
            console.error('Failed to complete purchase:', error);
            throw error;
        }
    };


    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('/getCart');
                if (response.ok) {
                    const cartItems = await response.json();
                    setCartItems(cartItems);
                } else {
                    console.error('Failed to fetch cart items.');
                }
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };

        fetchCartItems();
    }, []);


    return (
        <Router>
            <CustomNavbar
                cartItems={cartItems}
            />
            <Container className="mt-4">
                <Switch>
                    <Route exact path="/">
                        <HomePage
                            handleAddToCart={handleAddToCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                            cartItems={cartItems}
                        />
                    </Route>
                    <Route path="/search">
                        <SearchPage
                            searchResults={searchResults}
                            handleSearch={handleSearch}
                            handleAddToCart={handleAddToCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                            cartItems={cartItems}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </Route>
                    <Route path="/cart">
                        <CartPage
                            cartItems={cartItems}
                            removeItem={handleRemoveFromCart}
                            clearCart={handleClearCart}
                        />
                    </Route>
                    <Route path="/checkout">
                        <CheckoutPage
                            cartItems={cartItems}
                            completePurchase={completePurchase}
                        />
                    </Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default RouterPage;