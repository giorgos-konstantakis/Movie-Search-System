import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function TopRatedMovies(props) {

    var count = 0;

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [topRatedMovies2, setTopRatedMovies2] = useState([]);
    const [topRatedMovies3, setTopRatedMovies3] = useState([]);

    const fetchTopRated = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setTopRatedMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchTopRated2 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setTopRatedMovies2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchTopRated3 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setTopRatedMovies3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchTopRated();
    }, []);

    useEffect(() => {
        fetchTopRated2();
    }, []);

    useEffect(() => {
        fetchTopRated3();
    }, []);

    console.log(topRatedMovies3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(topRatedMovies.page - 1) * 20 + 1} - {topRatedMovies3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/movies/top_rated_movies_reverse/page/${topRatedMovies.page + 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(topRatedMovies.page - 1) * 20 + 1} - {(topRatedMovies.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/movies/top_rated_movies_reverse/page/${topRatedMovies.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(topRatedMovies.page - 1) * 20 + 1} - {topRatedMovies3.page * 20}</span>
                <Link className="card-header-font-sz mr-5" to={`/movies/top_rated_movies_reverse/page/${topRatedMovies.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/movies/top_rated_movies_reverse/page/${topRatedMovies.page + 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
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
                <div className="card">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        Top Rated Movies
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {topRatedMovies.results && topRatedMovies.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {topRatedMovies2.results && topRatedMovies2.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {topRatedMovies3.results && topRatedMovies3.results.map((topRated, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {topRatedMovies.page == 1 && firstPage()}
                    {topRatedMovies.page == 97 && lastPage()}
                    {topRatedMovies.page != 1 && topRatedMovies.page != 97 && renderPages()}
                </div>
            </div>
        </div>
    );

}

export default TopRatedMovies;