import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function PopularMoviesReverse(props) {
    var count = 0;

    const [popularMovies, setpopularMovies] = useState([]);
    const [popularMovies2, setpopularMovies2] = useState([]);
    const [popularMovies3, setpopularMovies3] = useState([]);

    const fetchpopular = () => {
        axios.get(`${process.env.REACT_APP_API}movie/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setpopularMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchpopular2 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setpopularMovies2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchpopular3 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setpopularMovies3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchpopular();
    }, []);

    useEffect(() => {
        fetchpopular2();
    }, []);

    useEffect(() => {
        fetchpopular3();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularMovies.page - 1) * 20 + 1} - {popularMovies3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/movies/popular_movies/page/${popularMovies.page + 3}`}>
                    <button type="button" className="btn search btn-outline-dark card-header-font-sz text-white p-2">
                        Next Page<i className="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages in last page
    const lastPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularMovies.page - 1) * 20 + 1} - {(popularMovies.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/movies/popular_movies/page/${popularMovies.page - 3}`}>
                    <button type="button" className="btn search btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages
    const renderPages = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularMovies.page - 1) * 20 + 1} - {popularMovies3.page * 20}</span>
                <Link className="mr-5 card-header-font-sz" to={`/movies/popular_movies/page/${popularMovies.page - 3}`}>
                    <button type="button" className="btn search btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/movies/popular_movies/page/${popularMovies.page + 3}`}>
                    <button type="button" className="btn search btn-outline-dark card-header-font-sz text-white p-2">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-dark-2 pb-5">
            <NavBar />
            <div className="container my-3">
                <div className="card border-info border-thickness">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        Popular Movies
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {popularMovies.results && popularMovies.results.map((popular, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${popular.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {popularMovies2.results && popularMovies2.results.map((popular, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${popular.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {popularMovies3.results && popularMovies3.results.map((popular, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${popular.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {popularMovies.page === 1 && firstPage()}
                    {popularMovies.page === 85 && lastPage()}
                    {popularMovies.page !== 1 && popularMovies.page !== 85 && renderPages()}
                </div>
            </div>
        </div>
    );
}


export default PopularMoviesReverse;