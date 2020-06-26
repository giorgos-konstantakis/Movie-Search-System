import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function Popup() {

    const [query, setQuery] = useState('');
    const [searchMovies, setSearchMovies] = useState([]);
    const focusSearch = useRef(null);

    // Get Top Rated Movies
    const fetchSearchMovies = (query) => {
        axios({ method: 'get', url: `${process.env.REACT_APP_API}search/movie?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=4&query=${query}`, timeout: 3000 })
            .then(res => { setSearchMovies(res.data.results) })
            .catch(error => alert('Error fetching the movies.'))
    };

    useEffect(() => {
        if (!query) return setSearchMovies([]);
        fetchSearchMovies(query);
    }, [query]);

    return (
        <div>
            <Form id="search-form">
                <label>Search Movies</label>
                <Form.Control type="email" placeholder="Search Movie"
                    ref={focusSearch} onChange={(e) => setQuery(e.target.value)} value={query} />
            </Form><br />
            <div>
                {searchMovies.map((movie, i) =>
                    <div key={i} action variant="secondary">
                        <Link to={`/movie_info/${movie.id}`}> <img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt="new" /> {movie.title} </Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Popup;