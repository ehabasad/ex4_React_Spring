import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import MovieItem from "../Cart/MovieItem";

const SearchResults = ({ results  , handleAddToCart  ,  handleRemoveFromCart  , cartItems}) => {
    return (
        <Row>
            {results.map((movie) => (
                <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <Card style={{ width: '14rem' }}>
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>Release Date: {movie.release_date}</Card.Text>
                            <MovieItem
                                key={movie.id}
                                movie={movie}
                                addToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
                                isInCart={cartItems.some((item) => item.id === movie.id)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default SearchResults;
