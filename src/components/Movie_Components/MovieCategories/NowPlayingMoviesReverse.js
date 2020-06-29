import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function NowPlayingMoviesReverse(props) {
    var count = 1;

    const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
    const [nowPlayingMovies2, setnowPlayingMovies2] = useState([]);
    const [nowPlayingMovies3, setnowPlayingMovies3] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchGenres = () => {
        axios.get(`${process.env.REACT_APP_API}genre/movie/list?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setGenres(res.data.genres) })
            .catch(error => alert('Error fetching the genres.'))
    };

    const fetchnowPlaying = () => {
        axios.get(`${process.env.REACT_APP_API}movie/now_playing?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setnowPlayingMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchnowPlaying2 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/now_playing?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setnowPlayingMovies2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchnowPlaying3 = () => {
        axios.get(`${process.env.REACT_APP_API}movie/now_playing?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setnowPlayingMovies3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchnowPlaying();
    }, []);

    useEffect(() => {
        fetchnowPlaying2();
    }, []);

    useEffect(() => {
        fetchnowPlaying3();
    }, []);

    console.log(nowPlayingMovies3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {nowPlayingMovies3.page * 20}</span>
                <Link to={`/movies/now_playing_movies/page/${nowPlayingMovies.page + 3}`}>
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
                <span className="mr-5">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {nowPlayingMovies3.page * 20}</span>
                <Link to={`/movies/now_playing_movies/page/${nowPlayingMovies.page - 3}`}>
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
                <span className="mr-5">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {nowPlayingMovies3.page * 20}</span>
                <Link className="mr-5" to={`/movies/now_playing_movies/page/${nowPlayingMovies.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/movies/now_playing_movies/page/${nowPlayingMovies.page + 3}`}>
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
                            <Dropdown.Item as={Link} to={`/top_rated_movies_by_genre/page/${1}/genre_id/${genre.id}/genre_name/${genre.name}`} eventKey={i}>
                                {genre.name}
                            </Dropdown.Item>
                        )}
                    </DropdownButton>
                </div>
                <div className="card">
                    <div className="card-header text-center">
                        Now Playing Movies
                    </div>
                    <div className="card-body">
                        {nowPlayingMovies.results && nowPlayingMovies.results.map((nowPlaying, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                            </div>
                        )}
                        {nowPlayingMovies2.results && nowPlayingMovies2.results.map((nowPlaying, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                            </div>
                        )}
                        {nowPlayingMovies3.results && nowPlayingMovies3.results.map((nowPlaying, i) =>
                            <div key={i} className="my-1">
                                <Link to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {nowPlayingMovies.page == 1 && firstPage()}
                    {nowPlayingMovies.page == 50 && lastPage()}
                    {nowPlayingMovies.page != 1 && nowPlayingMovies.page != nowPlayingMovies.total_pages && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default NowPlayingMoviesReverse;