import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MovieItem = ({ movie, addToCart, removeFromCart, isInCart }) => {

    const handleAddToCart = () => {
        addToCart(movie);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(movie.id);
    };

    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}  >
                {isInCart ? (
                    <Button variant="danger" onClick={handleRemoveFromCart}>
                        Remove from Cart
                    </Button>
                ) : (
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                )}
            </Card>
        </div>

    );
};

export default MovieItem;