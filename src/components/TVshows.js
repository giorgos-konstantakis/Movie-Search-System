import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './../NavBar'
import { Link } from 'react-router-dom';
import PopupSearchTV from './TVshow_Components/PopupSearchTV';
import Modal from 'react-modal';

function TVshows() {
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [latestTV, setlatestTV] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [airingTonight, setAiringTonight] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

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
                <div className="col-md-10 container text-center">
                    <h3 className="page-title bg-dark-1 py-3 text-light border-info border-thickness">TV SHOWS</h3>
                </div>
                <div className="col-md-2 container text-center">
                    <button className="btn btn-outline-dark text-light p-3 search" style={{ fontSize: '19px' }} onClick={openModal}>
                        Search TV Show
                    </button>
                    <Modal style={modalStyles} isOpen={modalOpen} onRequestClose={closeModal} size='sm'>
                        <button className="btn search btn-outline-light" onClick={closeModal} style={{ float: "right" }}>close</button>
                        <PopupSearchTV />
                    </Modal>
                </div>
            </div>

            <div className="row mt-4 mx-2">

                <div className="col-md-6">
                    <div className="card border-info border-thickness">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Airing Tonight
                            </div>
                        <div className="card-body bg-dark-1">
                            {airingTonight && airingTonight.slice(0, 5).map((air, i) => {
                                return (air.poster_path ?
                                    <div key={i} className="my-1">
                                        <Link className="text-light link-underline-style" to={`/tv_info/${air.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${air.poster_path}`} alt="new" /> {air.name}</Link>
                                    </div> :
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${air.id}`}><img className="photo-opac" style={{ width: "45px", height: "60px" }} src={require(`../images/no-photo-object.png`)} alt="new" /> {air.name} </Link>
                                    </div>
                                )
                            }
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Link className="btn btn-outline-dark text-light link-underline-style" style={{ margin: 'auto' }} to={`/tv_shows/airing_tonight_tv/page/${1}`}>View Airing Tonight</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card border-info border-thickness">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            On the Air ( week )
                        </div>
                        <div className="card-body bg-dark-1">
                            {onTheAir && onTheAir.slice(0, 5).map((air, i) => {
                                return (air.poster_path ?
                                    <div className="my-1" key={i}>
                                        <Link className="text-light link-underline-style" to={`/tv_info/${air.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${air.poster_path}`} alt="new" /> {air.name}</Link>
                                    </div> :
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${air.id}`}><img className="photo-opac" style={{ width: "45px", height: "60px" }} src={require(`../images/no-photo-object.png`)} alt="new" /> {air.name} </Link>
                                    </div>
                                )
                            }
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Link className="btn btn-outline-dark text-light link-underline-style" style={{ margin: 'auto' }} to={`/tv_shows/on_the_air_tv/page/${1}`}>View On The Air</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 mb-5 mx-2">

                <div className="col-md-6">
                    <div className="card border-info border-thickness">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Top Rated TV Shows
                            </div>
                        <div className="card-body bg-dark-1">
                            {topRatedTV.results && topRatedTV.results.slice(0, 5).map((topRated, i) => {
                                return (topRated.poster_path ?
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${topRated.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${topRated.poster_path}`} alt="new" /> {topRated.name} </Link>
                                    </div> :
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${topRated.id}`}><img className="photo-opac" style={{ width: "45px", height: "60px" }} src={require(`../images/no-photo-object.png`)} alt="new" /> {topRated.name} </Link>
                                    </div>
                                )
                            }
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Link className="btn btn-outline-dark text-light link-underline-style" style={{ margin: 'auto' }} to={`/tv_shows/top_rated_tv/page/${1}`}>View All Top Rated TV Shows</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-info border-thickness">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Popular TV Shows
                            </div>
                        <div className="card-body bg-dark-1">
                            {popularTV.results && popularTV.results.slice(0, 5).map((popular, i) => {
                                return (popular.poster_path ?
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${popular.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${popular.poster_path}`} alt="new" /> {popular.name} </Link>
                                    </div> :
                                    <div key={i} className="my-1">
                                        <Link className=" text-light link-underline-style" to={`/tv_info/${popular.id}`}><img className="photo-opac" style={{ width: "45px", height: "60px" }} src={require(`../images/no-photo-object.png`)} alt="new" /> {popular.name} </Link>
                                    </div>
                                )
                            }
                            )}
                            <div style={{ textAlign: 'center' }}>
                                <Link className="btn btn-outline-dark text-light link-underline-style" style={{ margin: 'auto' }} to={`/tv_shows/popular_tv/page/${1}`}>View All Popular TV shows</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}


export default TVshows;

