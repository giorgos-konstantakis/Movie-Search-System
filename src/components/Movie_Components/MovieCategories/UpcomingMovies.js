import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function UpcomingMovies(props) {

    var count = 0;

    const [upcomingMovies, setupcomingMovies] = useState([]);
    const [upcomingMovies2, setupcomingMovies2] = useState([]);
    const [upcomingMovies3, setupcomingMovies3] = useState([]);

    const fetchupcoming = () => {
        axios.get(`${process.env.REACT_APP_API}movie/upcoming?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setupcomingMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchupcoming2 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/upcoming?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setupcomingMovies2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchupcoming3 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/upcoming?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setupcomingMovies3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchupcoming();
    }, []);

    useEffect(() => {
        fetchupcoming2();
    }, []);

    useEffect(() => {
        fetchupcoming3();
    }, []);

    console.log(upcomingMovies3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(upcomingMovies.page - 1) * 20 + 1} - {upcomingMovies3.page * 20}</span>
                <Link to={`/movies/upcoming_movies_reverse/page/${upcomingMovies.page + 3}`}>
                    <button type="button" className="btn btn-dark">
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
                <span className="mr-5">Results: {(upcomingMovies.page - 1) * 20 + 1} - {(upcomingMovies.page - 1) * 20 + 1 + count}</span>
                <Link to={`/movies/upcoming_movies_reverse/page/${upcomingMovies.page - 3}`}>
                    <button type="button" className="btn btn-dark">
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
                <span className="mr-5">Results: {(upcomingMovies.page - 1) * 20 + 1} - {upcomingMovies3.page * 20}</span>
                <Link className="mr-5" to={`/movies/upcoming_movies_reverse/page/${upcomingMovies.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/movies/upcoming_movies_reverse/page/${upcomingMovies.page + 3}`}>
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
                        Upcoming Movies
                    </div>
                    <div className="card-body">
                        {upcomingMovies.results && upcomingMovies.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/movie_info/${upcoming.id}`}><img src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {upcomingMovies2.results && upcomingMovies2.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/movie_info/${upcoming.id}`}><img src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {upcomingMovies3.results && upcomingMovies3.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/movie_info/${upcoming.id}`}><img src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {upcomingMovies.page == 1 && firstPage()}
                    {upcomingMovies.page == 7 && lastPage()}
                    {upcomingMovies.page != 1 && upcomingMovies.page != 7 && renderPages()}
                </div>
            </div>
        </div>
    );

}

export default UpcomingMovies;