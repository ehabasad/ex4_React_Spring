import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import MovieItem from '../Cart/MovieItem';

const HomePage = ({ handleAddToCart,  handleRemoveFromCart ,  cartItems }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchMovieList();
    }, []);

    const fetchMovieList = async () => {
        try {
            const response = await fetch(
                'https://api.themoviedb.org/3/discover/movie?api_key=5f227e047f00750eb748dcab752a75a3'
            );
            const data = await response.json();
            setMovies(data.results);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching movie list:', error);
        }
    };

    const renderMovieGallery = () => {
        const galleryItems = movies.map((movie) => ({
            original: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            thumbnail: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            originalTitle: movie.title,
            description: (
                <div>
                    <h5>{movie.title}</h5>
                    <p className="movie-description">{movie.overview}</p>
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        addToCart={handleAddToCart}
                        removeFromCart={handleRemoveFromCart}
                        isInCart={cartItems.some((item) => item.id === movie.id)}
                    />
                </div>
            ),
        }));

        const galleryOptions = {
            showThumbnails: true,
            showFullscreenButton: true,
            showIndex: true,
            autoPlay: true,
            slideInterval: 5000,
            style:{ width: '200%', height: '200%' } // Resizing the photo

    };

        return (
            <div className="movie-gallery">
                <ImageGallery items={galleryItems} {...galleryOptions} />
            </div>
        );
    };

    return (

        <Container className="mt-4">
            <h1>Welcome to Movie Shop!</h1>
            <Row>
                <Col>
                    {isLoading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        renderMovieGallery()
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;




