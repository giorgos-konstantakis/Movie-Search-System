import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function UpcomingMoviesReverse(props) {

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
                <span className="mr-5 card-header-font-sz text-white">Results: {(upcomingMovies.page - 1) * 20 + 1} - {upcomingMovies3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/movies/upcoming_movies/page/${upcomingMovies.page + 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(upcomingMovies.page - 1) * 20 + 1} - {(upcomingMovies.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/movies/upcoming_movies/page/${upcomingMovies.page - 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(upcomingMovies.page - 1) * 20 + 1} - {upcomingMovies3.page * 20}</span>
                <Link className="card-header-font-sz mr-5" to={`/movies/upcoming_movies/page/${upcomingMovies.page - 3}`}>
                    <button type="button" className="btn search btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/movies/upcoming_movies/page/${upcomingMovies.page + 3}`}>
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
                        Upcoming Movies
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {upcomingMovies.results && upcomingMovies.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${upcoming.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {upcomingMovies2.results && upcomingMovies2.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${upcoming.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {upcomingMovies3.results && upcomingMovies3.results.map((upcoming, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${upcoming.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${upcoming.poster_path}`} alt="new" /> {upcoming.title}</Link>
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

export default UpcomingMoviesReverse;