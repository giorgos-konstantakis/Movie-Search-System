import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../NavBar'
import { Link } from 'react-router-dom';

function TVshows() {
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [latestTV, setlatestTV] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [airingTonight, setAiringTonight] = useState([]);

    // Get Top Rated TV
    const fetchTopRatedTV = () => {
        axios.get(`${process.env.REACT_APP_API}tv/top_rated?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setTopRatedTV(res.data) })
            .catch(error => alert('Error fetching the top rated tv shows.'))
    };

    useEffect(() => {
        fetchTopRatedTV();
    }, []);

    // Get Latest TV
    const fetchLatestTV = () => {
        axios.get(`${process.env.REACT_APP_API}tv/latest?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setlatestTV(res.data) })
            .catch(error => alert('Error fetching the latest tv show.'))
    };

    useEffect(() => {
        fetchLatestTV();
    }, []);

    // Get TV on the air 
    const fetchOnTheAir = () => {
        axios.get(`${process.env.REACT_APP_API}tv/on_the_air?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setOnTheAir(res.data.results) })
            .catch(error => alert('Error fetching on the air.'))
    };

    useEffect(() => {
        fetchOnTheAir();
    }, []);

    // Get Popular TV
    const fetchPopularTV = () => {
        axios.get(`${process.env.REACT_APP_API}tv/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setPopularTV(res.data) })
            .catch(error => alert('Error fetching popular tv shows.'))
    };

    useEffect(() => {
        fetchPopularTV();
    }, []);

    // Get Airing Tonight
    const fetchAiringTonight = () => {
        axios.get(`${process.env.REACT_APP_API}tv/airing_today?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setAiringTonight(res.data.results) })
            .catch(error => alert('Error fetching airing tonight.'))
    };

    useEffect(() => {
        fetchAiringTonight();
    }, []);


    return (
        <div>
            <NavBar />

            <div className="row mt-2 mx-2">
                <div className="col-md-5 container text-center">
                    <h3>TV</h3>
                </div>
                <div className="col-md-5 container">
                    <form>
                        <label>
                            Search TV show:
                            <input type="text" name="name" placeholder="type tv show" />
                        </label>
                        <input type="submit" value="Search" />
                    </form>
                </div>
            </div>

            <div className="row mt-2 mx-2">
                <div className="col-md-12" >
                    <div className="card">
                        <div className="card-header text-center">
                            Latest
                        </div>
                        <div className="card-body">
                            <div className="text-center">{latestTV.name}</div>
                            Network: {latestTV.networks && latestTV.networks.map((net, i) => <div key={i}>{net.name}</div>)}
                            Overview:<div>{latestTV.overview}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-2 mx-2">

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Airing Tonight
                            </div>
                        <div className="card-body">
                            {airingTonight && airingTonight.slice(0, 5).map((air, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${air.poster_path}`} alt="new" /> {air.name}
                                </div>
                            )}
                            <Link>View Airing Tonight</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            On the Air ( week )
                        </div>
                        <div className="card-body">
                            {onTheAir && onTheAir.slice(0, 5).map((air, i) =>
                                <div className="my-1" key={i}>
                                    <img src={`https://image.tmdb.org/t/p/w45/${air.poster_path}`} alt="new" /> {air.name}
                                </div>
                            )}
                            <Link>View On The Air</Link>
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
                            {topRatedTV.results && topRatedTV.results.slice(0, 5).map((topRated, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.name}
                                </div>
                            )}
                            <Link>View All Top Rated TV Shows</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            Popular Movies
                            </div>
                        <div className="card-body">
                            {popularTV.results && popularTV.results.slice(0, 5).map((popular, i) =>
                                <div key={i} className="my-1">
                                    <img src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.name}
                                </div>
                            )}
                            <Link>View All Popular TV shows</Link>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}


export default TVshows;

