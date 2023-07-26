import React from 'react';
import { Image, Button, Col, Row } from 'react-bootstrap';

const CartItem = ({ item, removeItem }) => {
    const { id, title, releaseDate, price, image } = item;

    const handleRemoveItem = () => {
        removeItem(id);
    };

    return (
        <Row className="cart-item">
            <Col xs={4} md={3}>
                <Image src={image} alt={title} rounded className="cart-item-image" />
            </Col>
            <Col xs={8} md={5} className="cart-item-details">
                <h4>{title}</h4>
                <p>Release Date: {releaseDate}</p>
            </Col>
            <Col xs={6} md={2} className="cart-item-price">
                <h4>${price.toFixed(2)}</h4>
            </Col>
            <Col xs={6} md={2} className="cart-item-actions">
                <Button variant="danger" onClick={handleRemoveItem}>
                    Remove
                </Button>
            </Col>
        </Row>
    );
};

export default CartItem;
