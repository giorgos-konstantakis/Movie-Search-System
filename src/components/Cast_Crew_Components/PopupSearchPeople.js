import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

function PopupSearchPeople() {

    const [query, setQuery] = useState('');
    const [searchPeople, setsearchPeople] = useState([]);
    const focusSearch = useRef(null);

    // Get Top Rated Movies
    const fetchsearchPeople = (query) => {
        axios({ method: 'get', url: `${process.env.REACT_APP_API}search/person?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=4&query=${query}`, timeout: 3000 })
            .then(res => { setsearchPeople(res.data.results) })
            .catch(error => alert('Error fetching the movies.'))
    };

    useEffect(() => {
        if (!query) return setsearchPeople([]);
        fetchsearchPeople(query);
    }, [query]);

    return (
        <div>
            <Form id="search-form">
                <label className="bg-light p-3 text-dark border-dark">Search People</label>
                <Form.Control className="mt-3 border-dark" type="email" placeholder="Search People"
                    ref={focusSearch} onChange={(e) => setQuery(e.target.value)} value={query} />
            </Form><br />
            <div>
                {searchPeople.map((person, i) =>
                    <div className="py-1" key={i} action variant="secondary">
                        <Link className="link-underline-style text-light" to={`/people/${person.id}`}> <img src={`https://image.tmdb.org/t/p/w45/${person.profile_path}`} alt="new" /> {person.name} </Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default PopupSearchPeople;