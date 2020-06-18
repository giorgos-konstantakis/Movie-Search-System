import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../NavBar'
import { Link } from 'react-router-dom';
import Popup from './Popup';
import Modal from 'react-modal';

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

    return (
        <div>
            <NavBar />

            <div className="row mt-2 mx-2">
                <div className="col-md-5 container text-center">
                    <h3>MOVIES</h3>
                </div>
                <div className="col-md-5 container">
                    <button onClick={openModal}>
                        Search Movie
                    </button>
                    <Modal isOpen={modalOpen} onRequestClose={closeModal} size='sm'>
                        <button onClick={closeModal} style={{ float: "right" }}>close</button>
                        <Popup />
                    </Modal>
                </div>
            </div>

            <div className="row mt-2 mx-2">
                <div className="col-md-12" >
                    <div className="card">
                        <div className="card-header text-center">
                            Latest
                        </div>
                        <div className="card-body">
                            <div className="text-center">{latestMovie.title}</div>
                            Overview:<div>{latestMovie.overview}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2 mx-2">

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Now Playing
                            </div>
                        <div className="card-body">
                            {nowPlaying.results && nowPlaying.results.slice(0, 5).map((movie, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt="new" /> {movie.title}
                                </div>
                            )}
                            <Link>View Now Playing</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Upcoming
                        </div>
                        <div className="card-body">
                            {upcoming && upcoming.slice(0, 5).map((movie, i) =>
                                <div className="my-1" key={i}>
                                    <img src={`https://image.tmdb.org/t/p/w45/${movie.poster_path}`} alt="new" /> {movie.title}
                                </div>
                            )}
                            <Link>View Upcoming Releases</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2 mx-2">

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Top Rated Movies
                            </div>
                        <div className="card-body">
                            {topRatedMovies.results && topRatedMovies.results.slice(0, 5).map((topRated, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.title}
                                </div>
                            )}
                            <Link>View All Top Rated Movies</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Popular Movies
                            </div>
                        <div className="card-body">
                            {popularMovies.results && popularMovies.results.slice(0, 5).map((popular, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.title}
                                </div>
                            )}
                            <Link>View All Popular Movies</Link>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default Movies;

