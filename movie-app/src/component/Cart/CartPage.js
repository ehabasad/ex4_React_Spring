import React from 'react';
import { Alert, Card, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, removeItem, clearCart }) => {
    return (
        <Container>
            <h2>Cart</h2>
            {cartItems.length === 0 && <Alert variant="info">Your cart is empty.</Alert>}
            {cartItems.length > 0 && (
                <div className="text-center mt-4">
                    <Button variant="danger" onClick={clearCart}>
                        Clear Cart
                    </Button>
                    <Button variant="primary" as={Link} to="/checkout" className="ml-2">
                        Proceed to Checkout
                    </Button>
                </div>
            )}
            <Row>
                {cartItems.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <Card style={{ width: '14rem' }}>
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Button variant="danger" onClick={() => removeItem(movie.id)}>
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CartPage;