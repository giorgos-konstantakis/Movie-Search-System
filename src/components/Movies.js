import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../NavBar'
import { Link } from 'react-router-dom';
import PopupSearchMovies from './Movie_Components/PopupSearchMovies';
import Modal from 'react-modal';
import './../styles/styles.css';

function Movies() {

    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [latestMovie, setlatestMovie] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    // Get Top Rated Movies
    const fetchTopRated = () => {
        axios.get(`${process.env.REACT_APP_API}movie/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setTopRatedMovies(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchTopRated();
    }, []);

    // Get Latest Movie
    const fetchLatestMovie = () => {
        axios.get(`${process.env.REACT_APP_API}movie/latest?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setlatestMovie(res.data) })
            .catch(error => alert('Error fetching the latest movie.'))
    };

    useEffect(() => {
        fetchLatestMovie();
    }, []);

    // Get Upcoming 
    const fetchUpcoming = () => {
        axios.get(`${process.env.REACT_APP_API}movie/upcoming?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setUpcoming(res.data.results) })
            .catch(error => alert('Error fetching upcoming movies.'))
    };

    useEffect(() => {
        fetchUpcoming();
    }, []);

    // Get Popular
    const fetchPopular = () => {
        axios.get(`${process.env.REACT_APP_API}movie/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setPopularMovies(res.data) })
            .catch(error => alert('Error fetching popular movies.'))
    };

    useEffect(() => {
        fetchPopular();
    }, []);

    // Get Now Playing
    const fetchNowPlaying = () => {
        axios.get(`${process.env.REACT_APP_API}movie/now_playing?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setNowPlaying(res.data) })
            .catch(error => alert('Error fetching now playing.'))
    };

    useEffect(() => {
        fetchNowPlaying();
    }, []);

    // Search Modal Closer and Opener
    function openModal() {
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    const modalStyles = {
        content: {
            width: '800px',
            height: '500px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: '-400px',
            marginTop: '-250px',
            background: ' #1a1a1a'
        }
    };

    return (
        <div className="bg-dark-2 pb-5">
            <NavBar />

            <div className="row mt-2 mx-2">
                <div className="col-md-5 container text-center">
                    <h3 className="page-title bg-dark-1 py-3 text-light">MOVIES</h3>
                </div>
                <div className="col-md-5 container text-center">
                    <button className="btn btn-outline-dark text-light p-3" style={{ fontSize: '20px' }} onClick={openModal}>
                        Search Movie
                    </button>
                    <Modal style={modalStyles} isOpen={modalOpen} onRequestClose={closeModal} size='sm'>
                        <button className="btn btn-outline-light" onClick={closeModal} style={{ float: "right" }}>close</button>
                        <PopupSearchMovies />
                    </Modal>
                </div>
            </div>

            <div className="row mt-2 mx-2">
                <div className="col-md-12" >
                    <div className="card">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Latest
                        </div>
                        <div className="card-body bg-dark-1 text-white">
                            <div className="text-center">{latestMovie.title}</div>
                            Overview:<div>{latestMovie.overview}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 mx-2">

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Now Playing
                            </div>
                        <div className="card-body bg-dark-1">
                            {nowPlaying.results && nowPlaying.results.slice(0, 5).map((movie, i) =>
                                <div key={i} className="my-1">
                                    <Link className=" text-light link-underline-style" to={`/movie_info/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt="new" /> {movie.title} </Link>
                                </div>
                            )}
                            <Link className="btn btn-outline-dark text-light link-underline-style" style={{ float: 'right' }} to={`/movies/now_playing_movies/page/${1}`}>View Now Playing</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Upcoming
                        </div>
                        <div className="card-body bg-dark-1">
                            {upcoming && upcoming.slice(0, 5).map((movie, i) =>
                                <div className="my-1" key={i}>
                                    <Link className=" text-light link-underline-style" to={`/movie_info/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt="new" /> {movie.title} </Link>
                                </div>
                            )}
                            <Link className="btn btn-outline-dark text-light link-underline-style" to={`/movies/upcoming_movies/page/${1}`}>View Upcoming Releases</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 mb-5 mx-2">

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Top Rated Movies
                            </div>
                        <div className="card-body bg-dark-1">
                            {topRatedMovies.results && topRatedMovies.results.slice(0, 5).map((topRated, i) =>
                                <div key={i} className="my-1">
                                    <Link className=" text-light link-underline-style" to={`/movie_info/${topRated.id}`}><img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}</Link>
                                </div>
                            )}
                            <Link className="btn btn-outline-dark text-light link-underline-style" to={`/movies/top_rated_movies/page/${1}`}>View All Top Rated Movies</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Popular Movies
                            </div>
                        <div className="card-body bg-dark-1">
                            {popularMovies.results && popularMovies.results.slice(0, 5).map((popular, i) =>
                                <div key={i} className="my-1 text-white">
                                    <Link className=" text-light link-underline-style" to={`/movie_info/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}</Link>
                                </div>
                            )}
                            <Link className="btn btn-outline-dark text-light link-underline-style" to={`/movies/popular_movies/page/${1}`}>View All Popular Movies</Link>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Movies;

