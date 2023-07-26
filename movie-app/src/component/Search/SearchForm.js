import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, FormCheck, Button, Row, Col } from 'react-bootstrap';

const SearchForm = ({ onSearch }) => {

    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [releaseYear, setReleaseYear] = useState('');
    const [releaseYearRange, setReleaseYearRange] = useState('');
    const [popularMovies, setPopularMovies] = useState(false);
    const [actorName, setActorName] = useState('');

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
                params: {
                    api_key: '5f227e047f00750eb748dcab752a75a3',
                },
            });
            setGenres(response.data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleGenreChange = (event) => {
        const genreId = parseInt(event.target.value);
        if (event.target.checked) {
            setSelectedGenres([...selectedGenres, genreId]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        }
    };

    const handleSearch = () => {
        onSearch(selectedGenres, releaseYear, releaseYearRange, popularMovies, actorName);
    };

    return (
        <div>
            <Row>
                <Col sm={3}>
                    <Form>
                        <Form.Label>Genres:</Form.Label>
                        {genres.map((genre) => (
                            <FormGroup key={genre.id} controlId={`genre-${genre.id}`}>
                                <FormCheck
                                    type="checkbox"
                                    label={genre.name}
                                    value={genre.id}
                                    checked={selectedGenres.includes(genre.id)}
                                    onChange={handleGenreChange}
                                />
                            </FormGroup>
                        ))}
                    </Form>
                </Col>
                <Col sm={4}>
                    <Form>
                        <FormGroup controlId="releaseYear">
                            <Form.Label>Release Year:</Form.Label>
                            <Form.Control
                                type="text"
                                value={releaseYear}
                                onChange={(e) => setReleaseYear(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="releaseYearRange">
                            <Form.Label>Release Year Range:</Form.Label>
                            <Form.Control
                                type="text"
                                value={releaseYearRange}
                                onChange={(e) => setReleaseYearRange(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="popularMovies">
                            <Form.Check
                                type="checkbox"
                                label="Popular Movies"
                                checked={popularMovies}
                                onChange={(e) => setPopularMovies(e.target.checked)}
                            />
                        </FormGroup>
                        <FormGroup controlId="actorName">
                            <Form.Label>Actor Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={actorName}
                                onChange={(e) => setActorName(e.target.value)}
                            />
                        </FormGroup>
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>

        </div>
    );



};

export default SearchForm;
