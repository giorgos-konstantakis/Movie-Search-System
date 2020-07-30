import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../NavBar'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Iframe from 'react-iframe';

function Episode(props) {

    const [episodeDetails, setEpisodeDetails] = useState([]);
    const [episodeImages, setEpisodeImages] = useState([]);
    const [episodeVideos, setEpisodeVideos] = useState([]);

    // Get Εpisode's Details
    const fetchEpisodeDetails = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/season/${props.match.params.season_number}/episode/${props.match.params.episode_number}?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setEpisodeDetails(res.data) })
            .catch(error => alert('Error fetching the episode details.'))
    };

    useEffect(() => {
        fetchEpisodeDetails();
    }, []);

    // Get Εpisode's Images
    const fetchEpisodeImages = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/season/${props.match.params.season_number}/episode/${props.match.params.episode_number}/images?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setEpisodeImages(res.data.stills) })
            .catch(error => alert('Error fetching the episode images.'))
    };

    useEffect(() => {
        fetchEpisodeImages();
    }, []);

    // Get Εpisode's Videos
    const fetchEpisodeVideos = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/season/${props.match.params.season_number}/episode/${props.match.params.episode_number}/videos?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setEpisodeVideos(res.data.results) })
            .catch(error => alert('Error fetching the episode videos.'))
    };

    useEffect(() => {
        fetchEpisodeVideos();
    }, []);

    let settingsSlider = {
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    let settingsSliderYoutube = {
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="bg-dark-2 pb-5">
            <NavBar />
            <div className="ml-5 mt-3" style={{ float: "left" }}>
                <Link className="btn btn-outline-dark text-light link-underline-style" to={`/episodes/${props.match.params.tv_show_name}/${props.match.params.season_number}/${props.match.params.id}`}>Previous Page...</Link>
            </div>
            <div className="container my-3">
                <h2 className="ml-4 text-center text-light">{props.match.params.tv_show_name}, Season {props.match.params.season_number},Episode {props.match.params.episode_number}</h2>
                <div className="container mt-3">
                    <div className="card mt-3">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            {episodeDetails.name}
                        </div>
                        <div className="card-body bg-dark-1 text-white">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={`https://image.tmdb.org/t/p/w300/${episodeDetails.still_path}`} alt="new" />
                                </div>
                                <div className="col-md-8">
                                    <div className="row mb-1">
                                        Air Date: {episodeDetails.air_date}
                                    </div>
                                    <div className="row mb-1">
                                        {episodeDetails.crew && episodeDetails.crew.map((crew, i) => {
                                            return (crew.job === 'Director' ?
                                                <div>{crew.job}:{crew.name}</div> : null)
                                        }
                                        )}
                                    </div>
                                    <div className="row mb-1">
                                        Overview: {episodeDetails.overview}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Episode's Images
                        </div>
                        <div className="card-body bg-dark-1 text-white">
                            <Slider {...settingsSlider}>
                                {episodeImages && episodeImages.map((image, i) => {
                                    return image.file_path ? <div key={i}>
                                        <img src={`https://image.tmdb.org/t/p/w300/${image.file_path}`} alt="new" />
                                    </div> : null
                                }
                                )}
                            </Slider>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Episode's Videos etc
                        </div>
                        <div className="card-body bg-dark-1 text-white">
                            <Slider {...settingsSliderYoutube}>
                                {episodeVideos && episodeVideos.map((video, i) =>
                                    <div key={i}>
                                        <Iframe src={`http://www.youtube.com/embed/${video.key}`} width="100%" position="relative"
                                            height="500px" />
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </div>

                    <div className="card mt-3">
                        <div className="card-header card-header-font-sz text-white text-center bg-dark">
                            Episode's cast and crew
                    </div>
                        <div className="card-body bg-dark-1 text-white">
                            <div className="container">
                                {episodeDetails.crew && episodeDetails.crew.map((crew, i) => {
                                    let source = '';
                                    if (crew.gender === 1) {
                                        source = `no-photo-woman.png`
                                    } else {
                                        source = `no-photo-male.jpg`
                                    }
                                    return (crew.profile_path ?
                                        <div className="py-4 row" key={i}>
                                            <Link className="photo-opac" to={`/people/${crew.id}`}>
                                                <div className="col-md-1"> <img src={`https://image.tmdb.org/t/p/w45/${crew.profile_path}`} alt="new" /> </div>
                                            </Link>
                                            <div className="py-3 col-md-3 text-center"> <Link className="text-light link-underline-style" to={`/people/${crew.id}`}>{crew.name}</Link> </div>
                                            <div className="py-3 col-md-3">{crew.job} </div>
                                        </div> :
                                        <div className="py-4 row" key={i}>
                                            <Link className="photo-opac" to={`/people/${crew.id}`}>
                                                <div className="col-md-1"> <img style={{ width: "45px", height: "60px" }} src={require(`../../images/${source}`)} alt="" /> </div>
                                            </Link>
                                            <div className="py-3 col-md-3 text-center"> <Link className="text-light link-underline-style" to={`/people/${crew.id}`}>{crew.name}</Link> </div>
                                            <div className="py-3 col-md-3">{crew.job} </div>
                                        </div>
                                    )
                                }
                                )}
                                {episodeDetails.guest_stars && episodeDetails.guest_stars.map((cast, i) => {
                                    let source = '';
                                    if (cast.gender === 1) {
                                        source = `no-photo-woman.png`
                                    } else {
                                        source = `no-photo-male.jpg`
                                    }
                                    return (cast.profile_path ?
                                        <div className="py-4 row" key={i}>
                                            <Link className="photo-opac" to={`/people/${cast.id}`}>
                                                <div className="col-md-1"> <img src={`https://image.tmdb.org/t/p/w45/${cast.profile_path}`} alt="new" /> </div>
                                            </Link>
                                            <div className="py-3 col-md-3 text-center"> <Link className="text-light link-underline-style" to={`/people/${cast.id}`}>{cast.name}</Link> </div>
                                            <div className="py-3 col-md-3">{cast.character} </div>
                                        </div> :
                                        <div className="py-4 row" key={i}>
                                            <Link className="photo-opac" to={`/people/${cast.id}`}>
                                                <div className="col-md-1"> <img style={{ width: "45px", height: "60px" }} src={require(`../../images/${source}`)} alt="" /> </div>
                                            </Link>
                                            <div className="py-3 col-md-3 text-center"> <Link className="text-light link-underline-style" to={`/people/${cast.id}`}>{cast.name}</Link> </div>
                                            <div className="py-3 col-md-3">{cast.character} </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Episode;