import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function TopRatedMoviesByGenre(props) {
    var count = 0;

    const [topRatedMoviesByGenre, setTopRatedMoviesByGenre] = useState([]);
    const [topRatedMoviesByGenre2, setTopRatedMoviesByGenre2] = useState([]);
    const [topRatedMoviesByGenre3, setTopRatedMoviesByGenre3] = useState([]);
    const [topRatedMoviesByGenre4, setTopRatedMoviesByGenre4] = useState([]);
    const [topRatedMoviesByGenre5, setTopRatedMoviesByGenre5] = useState([]);

    const fetchTopRatedByGenre = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setTopRatedMoviesByGenre(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre();
    }, []);

    const fetchTopRatedByGenre2 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page + 1}`)
            .then(res => { setTopRatedMoviesByGenre2(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre2();
    }, []);

    const fetchTopRatedByGenre3 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page + 2}`)
            .then(res => { setTopRatedMoviesByGenre3(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre3();
    }, []);

    const fetchTopRatedByGenre4 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page + 3}`)
            .then(res => { setTopRatedMoviesByGenre4(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre4();
    }, []);

    const fetchTopRatedByGenre5 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page + 4}`)
            .then(res => { setTopRatedMoviesByGenre5(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre5();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = (count) => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {count}</span>
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) + 5}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages in last page
    const lastPage = (count) => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {count}</span>
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) - 5}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages
    const renderPages = (count) => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {count} </span>
                <Link className="mr-5" to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) - 5}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) + 5}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="container my-3">
                <div className="card">
                    <div className="card-header text-center">
                        Top Rated {props.match.params.genre_name} Movies
                    </div>
                    <div className="card-body">
                        {topRatedMoviesByGenre.results && topRatedMoviesByGenre.results.map((topRated, i) => {
                            if (topRated.genre_ids.includes(parseInt(props.match.params.genre_id))) {
                                count += 1;
                                return (
                                    <div key={i} className="my-1">
                                        <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                    </div>
                                )
                            }
                        }
                        )}
                        {topRatedMoviesByGenre2.results && topRatedMoviesByGenre2.results.map((topRated, i) => {
                            if (topRated.genre_ids.includes(parseInt(props.match.params.genre_id))) {
                                count += 1;
                                return (
                                    <div key={i} className="my-1">
                                        <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                    </div>
                                )
                            }
                        }
                        )}
                        {topRatedMoviesByGenre3.results && topRatedMoviesByGenre3.results.map((topRated, i) => {
                            if (topRated.genre_ids.includes(parseInt(props.match.params.genre_id))) {
                                count += 1;
                                return (
                                    <div key={i} className="my-1">
                                        <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                    </div>
                                )
                            }
                        }
                        )}
                        {topRatedMoviesByGenre4.results && topRatedMoviesByGenre4.results.map((topRated, i) => {
                            if (topRated.genre_ids.includes(parseInt(props.match.params.genre_id))) {
                                count += 1;
                                return (
                                    <div key={i} className="my-1">
                                        <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                    </div>
                                )
                            }
                        }
                        )}
                        {topRatedMoviesByGenre5.results && topRatedMoviesByGenre5.results.map((topRated, i) => {
                            if (topRated.genre_ids.includes(parseInt(props.match.params.genre_id))) {
                                count += 1;
                                return (
                                    <div key={i} className="my-1">
                                        <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                    </div>
                                )
                            }
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {topRatedMoviesByGenre.page == 1 && firstPage(count)}
                    {topRatedMoviesByGenre.page == topRatedMoviesByGenre.total_pages && lastPage(count)}
                    {topRatedMoviesByGenre.page != 1 && topRatedMoviesByGenre.page != topRatedMoviesByGenre.total_pages && renderPages(count)}
                </div>
            </div>
        </div>
    );

}

export default TopRatedMoviesByGenre;