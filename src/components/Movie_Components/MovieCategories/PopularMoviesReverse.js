import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function PopularMoviesReverse(props) {
    var count = 1;

    const [popularMovies, setpopularMovies] = useState([]);
    const [popularMovies2, setpopularMovies2] = useState([]);
    const [popularMovies3, setpopularMovies3] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchGenres = () => {
        axios.get(`${process.env.REACT_APP_API}genre/movie/list?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setGenres(res.data.genres) })
            .catch(error => alert('Error fetching the genres.'))
    };

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
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchpopular();
    }, []);

    useEffect(() => {
        fetchpopular2();
    }, []);

    useEffect(() => {
        fetchpopular3();
    }, []);

    console.log(popularMovies3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(popularMovies.page - 1) * 20 + 1} - {popularMovies3.page * 20}</span>
                <Link to={`/movies/popular_movies/page/${popularMovies.page + 3}`}>
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
                <span className="mr-5">Results: {(popularMovies.page - 1) * 20 + 1} - {popularMovies3.page * 20}</span>
                <Link to={`/movies/popular_movies/page/${popularMovies.page - 3}`}>
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
                <span className="mr-5">Results: {(popularMovies.page - 1) * 20 + 1} - {popularMovies3.page * 20}</span>
                <Link className="mr-5" to={`/movies/popular_movies/page/${popularMovies.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/movies/popular_movies/page/${popularMovies.page + 3}`}>
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
                            <Dropdown.Item as={Link} to={`/popular_movies_by_genre/page/${1}/genre_id/${genre.id}/genre_name/${genre.name}`} eventKey={i}>
                                {genre.name}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                </div>
                <div className="card">
                    <div className="card-header text-center">
                        Popular Movies
                    </div>
                    <div className="card-body">
                        {popularMovies.results && popularMovies.results.map((popular, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                            </div>
                        )}
                        {popularMovies2.results && popularMovies2.results.map((popular, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                            </div>
                        )}
                        {popularMovies3.results && popularMovies3.results.map((popular, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {popularMovies.page == 1 && firstPage()}
                    {popularMovies.page == 50 && lastPage()}
                    {popularMovies.page != 1 && popularMovies.page != popularMovies.total_pages && renderPages()}
                </div>
            </div>
        </div>
    );

}


export default PopularMoviesReverse;