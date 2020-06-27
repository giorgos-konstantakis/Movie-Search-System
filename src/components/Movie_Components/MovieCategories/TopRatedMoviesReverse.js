import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function TopRatedMoviesReverse(props) {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchGenres = () => {
        axios.get(`${process.env.REACT_APP_API}genre/movie/list?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setGenres(res.data.genres) })
            .catch(error => alert('Error fetching the genres.'))
    };

    const fetchTopRated = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setTopRatedMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchTopRated();
    }, []);


    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(topRatedMovies.page - 1) * 20 + 1} - {topRatedMovies.page * 20}</span>
                <Link to={`/movies/top_rated_movies/page/${topRatedMovies.page + 1}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    // Setting buttons for changing pages in last page
    const lastPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(topRatedMovies.page - 1) * 20 + 1} - {topRatedMovies.page * 20}</span>
                <Link to={`/movies/top_rated_movies/page/${topRatedMovies.page - 1}`}>
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
                <span className="mr-5">Results: {(topRatedMovies.page - 1) * 20 + 1} - {topRatedMovies.page * 20}</span>
                <Link className="mr-5" to={`/movies/top_rated_movies/page/${topRatedMovies.page - 1}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/movies/top_rated_movies/page/${topRatedMovies.page + 1}`}>
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
                <div className="my-2 text-right">
                    <DropdownButton title="Search Top Rated Movies by Genre" id="xx">
                        {genres && genres.map((genre, i) =>
                            <Link><Dropdown.Item key={i} eventKey={i}>
                                {genre.name}
                            </Dropdown.Item></Link>
                        )}
                    </DropdownButton>
                </div>
                <div className="card">
                    <div className="card-header text-center">
                        Top Rated Movies
                    </div>
                    <div className="card-body">
                        {topRatedMovies.results && topRatedMovies.results.map((topRated, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {topRatedMovies.page == 1 && firstPage()}
                    {topRatedMovies.page == topRatedMovies.total_pages && lastPage()}
                    {topRatedMovies.page != 1 && topRatedMovies.page != topRatedMovies.total_pages && renderPages()}
                </div>
            </div>
        </div>
    );

}

export default TopRatedMoviesReverse;