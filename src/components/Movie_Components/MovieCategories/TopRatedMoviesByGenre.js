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

    const fetchTopRatedByGenre = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setTopRatedMoviesByGenre(res.data) })
            .catch(error => alert(`Error fetching the top rated movies.`))
    };

    useEffect(() => {
        fetchTopRatedByGenre();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = (count) => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {count}</span>
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) + 1}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
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
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) - 1}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
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
                <Link className="mr-5" to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) - 1}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/top_rated_movies_by_genre_reverse/page/${parseInt(props.match.params.page) + 1}/genre_id/${props.match.params.genre_id}/genre_name/${props.match.params.genre_name}`}>
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