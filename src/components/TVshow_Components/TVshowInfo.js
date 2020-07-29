import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './../../NavBar'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Iframe from 'react-iframe';

function TVshowInfo(props) {

    const [showCast, setShowCast] = useState([]);
    const [showCrew, setShowCrew] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [showTrailers, setShowTrailers] = useState([]);
    const [showRecommendations, setShowRecommendations] = useState([]);

    // Get Show's Details
    const fetchShowDetails = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setShowDetails(res.data) })
            .catch(error => alert('Error fetching the show details.'))
    };

    useEffect(() => {
        fetchShowDetails();
    }, []);

    // Get Show's Cast And Crew
    const fetchShowCastAndCrew = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/credits?api_key=2e7b1176bc4b39e965d3bc9552afd324`)
            .then(res => { setShowCast(res.data.cast); setShowCrew(res.data.crew) })
            .catch(error => alert('Error fetching the show cast and crew.'))
    };

    useEffect(() => {
        fetchShowCastAndCrew();
    }, []);

    // Get Show's Trailers
    const fetchShowTrailers = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/videos?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setShowTrailers(res.data.results) })
            .catch(error => alert('Error fetching the movie trailers.'))
    };

    useEffect(() => {
        fetchShowTrailers();
    }, []);

    // Get Show's Recommendations
    const fetchShowRecommendations = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/recommendations?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setShowRecommendations(res.data.results) })
            .catch(error => alert('Error fetching the show recommendations.'))
    };

    useEffect(() => {
        fetchShowRecommendations();
    }, []);

    let settingsSlider = {
        infinite: false,
        speed: 500,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5
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
            <div className="container my-3">
                <div className="card">
                    <div className="card-header text-white text-center bg-dark">
                        <div className="card-header-font-sz"> {showDetails.original_name}</div>
                        <div>{showDetails.number_of_seasons} seasons,{showDetails.number_of_episodes} episodes</div>
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={`https://image.tmdb.org/t/p/w300/${showDetails.poster_path}`} alt="new" />
                            </div>
                            <div className="col-md-4">
                                <div className="row mb-1">
                                    Created by:
                                    {showDetails.created_by && showDetails.created_by.map((created_by, i) =>
                                    <div key={i}>
                                        {created_by.name} ,
                                    </div>
                                )}
                                </div>
                                <div className="row mb-1">
                                    First-Air Date: {showDetails.first_air_date}
                                </div>
                                <div className="row mb-1">
                                    Episode runtime: {showDetails.episode_run_time} mins
                                </div>
                                <div className="row mb-1">
                                    Overview: <br />
                                    {showDetails.overview}
                                </div>
                            </div>
                            <div className="col-md-3 ml-5">
                                <div className="row mb-1">
                                    Original Language: {showDetails.original_language}
                                </div>
                                <div className="row mb-1">
                                    Languages Spoken:
                                    <ul >
                                        {showDetails.languages && showDetails.languages.map((language, i) => (
                                            <li key={i}>
                                                {language}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                                <div className="row mb-1">
                                    Genres:
                                    <ul >
                                        {showDetails.genres && showDetails.genres.map((genre) => (
                                            <li key={genre.id}>
                                                {genre.name}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                                <div className="row mb-1">
                                    Production:
                                    <ul >
                                        {showDetails.production_companies && showDetails.production_companies.map((company, i) => (
                                            <li key={i}>
                                                {company.name}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                                <div className="row mb-1">
                                    Countries:
                                    <ul >
                                        {showDetails.origin_country && showDetails.origin_country.map((country, i) => (
                                            <li key={i}>
                                                {country}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        Seasons
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <div className="row">
                            {showDetails.seasons && showDetails.seasons.map((season, i) =>
                                <div key={i} className="col-md-1 mx-2 text-center">
                                    <div className="text-center ml-2">Season {season.season_number}</div>
                                    <Link to={`/episodes/${showDetails.name}/${season.season_number}/${props.match.params.id}`}>
                                        <img className="photo-opac" src={`https://image.tmdb.org/t/p/w92/${season.poster_path}`} alt="new" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        Trailers etc for {showDetails.original_name}
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <Slider {...settingsSliderYoutube}>
                            {showTrailers && showTrailers.map((showTrailer, i) =>
                                <div key={i}>
                                    <Iframe src={`http://www.youtube.com/embed/${showTrailer.key}`} width="100%" position="relative"
                                        height="500px" />
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        Recommended tv shows to watch after {showDetails.original_name}
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <Slider {...settingsSlider}>
                            {showRecommendations && showRecommendations.map((showRec, i) => {
                                return showRec.poster_path ? <div key={i}>
                                    <Link to={`/tv_info_reverse/${showRec.id}`} > <img className="photo-opac" src={`https://image.tmdb.org/t/p/w154/${showRec.poster_path}`} alt="new" /> </Link>
                                </div> : null
                            }
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        {showDetails.original_name}'s cast and crew
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <div className="container">
                            {showCast.map((cast, i) =>
                                <div className="py-4 row" key={i}>
                                    <Link to={`/people/${cast.id}`}>
                                        <div className="col-md-1"> <img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${cast.profile_path}`} alt="new" /> </div>
                                    </Link>
                                    <div className="py-3 col-md-3 text-center"><Link className="text-light link-underline-style" to={`/people/${cast.id}`}> {cast.name}</Link> </div>
                                    <div className="py-3 col-md-3">{cast.character} </div>
                                </div>
                            )}
                            {showCrew.map((crew, i) =>
                                <div className="py-4 row" key={i}>
                                    <Link to={`/people/${crew.id}`}>
                                        <div className="col-md-1"> <img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${crew.profile_path}`} alt="new" /> </div>
                                    </Link>
                                    <div className="py-3 col-md-3 text-center"> <Link className="text-light link-underline-style" to={`/people/${crew.id}`}>{crew.name}</Link> </div>
                                    <div className="py-3 col-md-3">{crew.job} </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TVshowInfo;