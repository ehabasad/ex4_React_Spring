import React, { useState } from 'react';
import axios from 'axios';
import { Container} from "react-bootstrap";
import SearchResults from "./SearchResults";
import SearchForm from "./SearchForm";


const SearchPage = ({ handleAddToCart, handleRemoveFromCart, cartItems }) => {
    const [movies, setMovies] = useState([]);

    const searchMovies = async (selectedGenres, releaseYear, releaseYearRange, popularMovies, actorName) => {
        try {
            const params = {
                api_key: '5f227e047f00750eb748dcab752a75a3',
                include_adult: false,
            };

            if (selectedGenres.length > 0) {
                params['with_genres'] = selectedGenres.join(',');
            }

            if (releaseYear) {
                params['primary_release_year'] = releaseYear;
            }

            if (releaseYearRange) {
                const [startYear, endYear] = releaseYearRange.split('-');
                params['primary_release_date.gte'] = `${startYear}-01-01`;
                params['primary_release_date.lte'] = `${endYear}-12-31`;
            }

            if (popularMovies) {
                params['sort_by'] = 'popularity.desc';
            }

            if (actorName) {
                const actorId = await getActorId(actorName);
                if (actorId) {
                    params['with_people'] = actorId;
                }
            }

            const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    };

    const getActorId = async (actorName) => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/person', {
                params: {
                    api_key: '5f227e047f00750eb748dcab752a75a3',
                    query: actorName,
                },
            });
            if (response.data.results.length > 0) {
                return response.data.results[0].id;
            }
        } catch (error) {
            console.error('Error searching actor:', error);
        }
        return null;
    };

    return (
        <div>
            <h1>Movie Search</h1>
            <SearchForm onSearch={searchMovies} />
            <Container>
                <SearchResults
                    results={movies}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    cartItems={cartItems}
                />
            </Container>
        </div>
    );
};

export default SearchPage;



