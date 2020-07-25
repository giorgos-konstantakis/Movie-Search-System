import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './../../NavBar'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Iframe from 'react-iframe';

function MovieInfo(props) {

    const [movieCast, setMovieCast] = useState([]);
    const [movieCrew, setMovieCrew] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieTrailers, setMovieTrailers] = useState([]);
    const [movieRecommendations, setMovieRecommendations] = useState([]);

    // Get Movie's Details
    const fetchMovieDetails = () => {
        axios.get(`${process.env.REACT_APP_API}movie/${props.match.params.id}?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setMovieDetails(res.data) })
            .catch(error => alert('Error fetching the movie details.'))
    };

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    // Get Movie's Cast And Crew
    const fetchMovieCastAndCrew = () => {
        axios.get(`${process.env.REACT_APP_API}movie/${props.match.params.id}/credits?api_key=2e7b1176bc4b39e965d3bc9552afd324`)
            .then(res => { setMovieCast(res.data.cast); setMovieCrew(res.data.crew) })
            .catch(error => alert('Error fetching the movie cast and crew.'))
    };

    useEffect(() => {
        fetchMovieCastAndCrew();
    }, []);

    // Get Movie's Trailers
    const fetchMovieTrailers = () => {
        axios.get(`${process.env.REACT_APP_API}movie/${props.match.params.id}/videos?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setMovieTrailers(res.data.results) })
            .catch(error => alert('Error fetching the movie trailers.'))
    };

    useEffect(() => {
        fetchMovieTrailers();
    }, []);

    // Get Movie's Recommendations
    const fetchMovieRecommendations = () => {
        axios.get(`${process.env.REACT_APP_API}movie/${props.match.params.id}/recommendations?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=1`)
            .then(res => { setMovieRecommendations(res.data.results) })
            .catch(error => alert('Error fetching the movie recommendations.'))
    };

    useEffect(() => {
        fetchMovieRecommendations();
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
        <div>
            <NavBar />
            <div className="container my-3">
                <div className="card">
                    <div className="card-header text-center">
                        {movieDetails.title}
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`} alt="new" />
                            </div>
                            <div className="col-md-4">
                                <div className="row mb-1">
                                    Release Date: {movieDetails.release_date}
                                </div>
                                <div className="row mb-1">
                                    Budget: {movieDetails.budget}$
                                 </div>
                                <div className="row mb-1">
                                    Runtime: {movieDetails.runtime} mins
                                </div>
                                <div className="row mb-1">
                                    Overview: <br />
                                    {movieDetails.overview}
                                </div>
                            </div>
                            <div className="col-md-3 ml-5">
                                <div className="row mb-1">
                                    Original Language: {movieDetails.original_language}
                                </div>
                                <div className="row mb-1">
                                    Languages Spoken:
                                    <ul >
                                        {movieDetails.spoken_languages && movieDetails.spoken_languages.map((language, i) => (
                                            <li key={i}>
                                                {language.name}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                                <div className="row mb-1">
                                    Genres:
                                    <ul >
                                        {movieDetails.genres && movieDetails.genres.map((genre) => (
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
                                        {movieDetails.production_companies && movieDetails.production_companies.map((company, i) => (
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
                                        {movieDetails.production_countries && movieDetails.production_countries.map((country, i) => (
                                            <li key={i}>
                                                {country.name}
                                            </li>
                                        ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header text-center">
                        Trailers etc for {movieDetails.title}
                    </div>
                    <div className="card-body bg-dark">
                        <Slider {...settingsSliderYoutube}>
                            {movieTrailers && movieTrailers.map((movieTrailer, i) =>
                                <div key={i}>
                                    <Iframe src={`http://www.youtube.com/embed/${movieTrailer.key}`} width="100%" position="relative"
                                        height="500px" />
                                </div>
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header text-center">
                        Recommended movies to watch after {movieDetails.title}
                    </div>
                    <div className="card-body bg-dark">
                        <Slider {...settingsSlider}>
                            {movieRecommendations && movieRecommendations.map((movieRec, i) => {
                                return movieRec.poster_path ? <div key={i}>
                                    <Link to={`/movie_info_reverse/${movieRec.id}`} > <img src={`https://image.tmdb.org/t/p/w154/${movieRec.poster_path}`} alt="new" /> </Link>
                                </div> : null
                            }
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header text-center">
                        {movieDetails.title}'s cast and crew
                    </div>
                    <div className="card-body">
                        <div className="container">
                            {movieCast.map((cast, i) =>
                                <div className="py-4 row" key={i}>
                                    <Link to={`/people/${cast.id}`}>
                                        <div className="col-md-1"> <img src={`https://image.tmdb.org/t/p/w45/${cast.profile_path}`} alt="new" /> </div>
                                    </Link>
                                    <div className="py-3 col-md-3 text-center"> {cast.name} </div>
                                    <div className="py-3 col-md-3">{cast.character} </div>
                                </div>
                            )}
                            {movieCrew.map((crew, i) =>
                                <div className="py-4 row" key={i}>
                                    <Link to={`/people/${crew.id}`}>
                                        <div className="col-md-1"> <img src={`https://image.tmdb.org/t/p/w45/${crew.profile_path}`} alt="new" /> </div>
                                    </Link>
                                    <div className="py-3 col-md-3 text-center"> {crew.name} </div>
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

export default MovieInfo;