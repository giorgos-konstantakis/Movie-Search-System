import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function NowPlayingMovies(props) {
    var count = 0;

    const [nowPlayingMovies, setnowPlayingMovies] = useState([]);
    const [nowPlayingMovies2, setnowPlayingMovies2] = useState([]);
    const [nowPlayingMovies3, setnowPlayingMovies3] = useState([]);

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
        fetchnowPlaying();
    }, []);

    useEffect(() => {
        fetchnowPlaying2();
    }, []);

    useEffect(() => {
        fetchnowPlaying3();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {nowPlayingMovies3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/movies/now_playing_movies_reverse/page/${nowPlayingMovies.page + 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {(nowPlayingMovies.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/movies/now_playing_movies_reverse/page/${nowPlayingMovies.page - 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(nowPlayingMovies.page - 1) * 20 + 1} - {nowPlayingMovies3.page * 20}</span>
                <Link className="mr-5 card-header-font-sz" to={`/movies/now_playing_movies_reverse/page/${nowPlayingMovies.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/movies/now_playing_movies_reverse/page/${nowPlayingMovies.page + 3}`}>
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
                        Now Playing Movies
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {nowPlayingMovies.results && nowPlayingMovies.results.map((nowPlaying, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {nowPlayingMovies2.results && nowPlayingMovies2.results.map((nowPlaying, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                                </div>
                            )
                        }
                        )}
                        {nowPlayingMovies3.results && nowPlayingMovies3.results.map((nowPlaying, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/movie_info/${nowPlaying.id}`}><img src={`https://image.tmdb.org/t/p/w45/${nowPlaying.poster_path}`} alt="new" /> {nowPlaying.title}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {nowPlayingMovies.page == 1 && firstPage()}
                    {nowPlayingMovies.page == 25 && lastPage()}
                    {nowPlayingMovies.page != 1 && nowPlayingMovies.page != 25 && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default NowPlayingMovies;