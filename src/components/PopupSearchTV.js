import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function PopupSearchTV() {

    const [query, setQuery] = useState('');
    const [searchTV, setsearchTV] = useState([]);
    const focusSearch = useRef(null);

    // Get Top Rated tvs
    const fetchsearchTV = (query) => {
        axios({ method: 'get', url: `${process.env.REACT_APP_API}search/tv?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=4&query=${query}`, timeout: 3000 })
            .then(res => { setsearchTV(res.data.results) })
            .catch(error => alert('Error fetching the tv shows.'))
    };

    useEffect(() => {
        if (!query) return setsearchTV([]);
        fetchsearchTV(query);
    }, [query]);

    return (
        <div>
            <Form id="search-form">
                <label>Search TV Shows</label>
                <Form.Control type="email" placeholder="Search tv"
                    ref={focusSearch} onChange={(e) => setQuery(e.target.value)} value={query} />
            </Form><br />
            <div>
                {searchTV.map((tv, i) =>
                    <div key={i} action variant="secondary">
                        <Link to={`/tv_info/${tv.id}`}> <img src={`https://image.tmdb.org/t/p/w45/${tv.poster_path}`} alt="new" /> {tv.title} </Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PopupSearchTV;