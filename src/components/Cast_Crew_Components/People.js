import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../NavBar'
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Iframe from 'react-iframe';

function People(props) {

    const [peopleDetails, setPeopleDetails] = useState([]);
    const [peopleImages, setPeopleImages] = useState([]);
    const [peopleCombinedCredits, setPeopleCombinedCredits] = useState([]);

    // Get People's Details
    const fetchPeopleDetails = () => {
        axios.get(`${process.env.REACT_APP_API}person/${props.match.params.id}?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setPeopleDetails(res.data) })
            .catch(error => alert('Error fetching the episode details.'))
    };

    useEffect(() => {
        fetchPeopleDetails();
    }, []);

    // Get People's Images
    const fetchPeopleImages = () => {
        axios.get(`${process.env.REACT_APP_API}person/${props.match.params.id}/images?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setPeopleImages(res.data.profiles) })
            .catch(error => alert('Error fetching the episode images.'))
    };

    useEffect(() => {
        fetchPeopleImages();
    }, []);

    // Get People's Credits
    const fetchPeopleCombinedCredits = () => {
        axios.get(`${process.env.REACT_APP_API}person/${props.match.params.id}/combined_credits?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setPeopleCombinedCredits(res.data) })
            .catch(error => alert('Error fetching the episode videos.'))
    };

    useEffect(() => {
        fetchPeopleCombinedCredits();
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
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        {peopleDetails.name}
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={`https://image.tmdb.org/t/p/w300/${peopleDetails.profile_path}`} alt="new" />
                            </div>
                            <div className="col-md-8">
                                <div className="row mb-1">
                                    Birthday: {peopleDetails.birthday}
                                </div>
                                <div className="row mb-1">
                                    Deathday: {peopleDetails.deathday === null ? 'alive' : peopleDetails.deathday}
                                </div>
                                <div className="row mb-1">
                                    Known for: {peopleDetails.known_for_department}
                                </div>
                                <div className="row mb-1">
                                    Gender: {peopleDetails.gender == 2 ? 'male' : 'female'}
                                </div>
                                <div className="row mb-1">
                                    Place of Birth: {peopleDetails.place_of_birth}
                                </div>
                                <div className="row mb-1">
                                    Biography:
                                    <div>{peopleDetails.biography}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        {peopleDetails.name} Photos
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <Slider {...settingsSlider}>
                            {peopleImages && peopleImages.map((image, i) => {
                                return image.file_path ? <div key={i}>
                                    <img src={`https://image.tmdb.org/t/p/w185/${image.file_path}`} alt="new" />
                                </div> : null
                            }
                            )}
                        </Slider>
                    </div>
                </div>

                <div className="card mt-2">
                    <div className="card-header card-header-font-sz text-white text-center bg-dark">
                        {peopleDetails.name} Filmography and Credits
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        <div className="container">
                            {peopleCombinedCredits.cast && peopleCombinedCredits.cast.map((cast, i) => {
                                return (cast.poster_path ?
                                    <div className="py-4 row" key={i}>
                                        <Link to={`/movie_info/${cast.id}`}>
                                            <div className="col-md-1"> <img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${cast.poster_path}`} alt="new" /> </div>
                                        </Link>
                                        <div className="py-3 col-md-3 text-center"> <Link className="name-title-font-sz text-light link-underline-style" to={`/movie_info/${cast.id}`}>{cast.title ? cast.title : cast.name}</Link> </div>
                                        <div className="py-3 col-md-3 text-center name-title-font-sz"> {!cast.character ? 'Himself/Herself' : cast.character} </div>
                                        <div className="py-3 col-md-3 name-title-font-sz">{cast.media_type} </div>
                                    </div> :
                                    <div className="py-4 row" key={i}>
                                        <Link to={`/movie_info/${cast.id}`}>
                                            <div className="col-md-1"> <img style={{ width: "45px", height: "60px" }} src={require(`../../images/no-photo-object.png`)} alt="" /> </div>
                                        </Link>
                                        <div className="py-3 col-md-3 text-center"> <Link className="name-title-font-sz text-light link-underline-style" to={`/movie_info/${cast.id}`}>{cast.title ? cast.title : cast.name}</Link> </div>
                                        <div className="py-3 col-md-3 text-center name-title-font-sz"> {!cast.character ? 'Himself/Herself' : cast.character} </div>
                                        <div className="py-3 col-md-3 name-title-font-sz">{cast.media_type} </div>
                                    </div>
                                )
                            }
                            )}
                            {peopleCombinedCredits.crew && peopleCombinedCredits.crew.map((crew, i) => {
                                return (crew.poster_path ?
                                    <div className="py-4 row" key={i}>
                                        <Link to={`/TV_info/${crew.id}`}>
                                            <div className="col-md-1"> <img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${crew.poster_path}`} alt="new" /> </div>
                                        </Link>
                                        <div className="py-3 col-md-3 text-center"> <Link className="name-title-font-sz text-light link-underline-style" to={`/movie_info/${crew.id}`}>{crew.title} </Link></div>
                                        <div className="py-3 col-md-3 text-center name-title-font-sz"> {crew.job} </div>
                                        <div className="py-3 col-md-3 name-title-font-sz">{crew.media_type} </div>
                                    </div> :
                                    <div className="py-4 row" key={i}>
                                        <Link to={`/TV_info/${crew.id}`}>
                                            <div className="col-md-1"> <img style={{ width: "45px", height: "60px" }} src={require(`../../images/no-photo-object.png`)} alt="" /> </div>
                                        </Link>
                                        <div className="py-3 col-md-3 text-center"> <Link className="name-title-font-sz text-light link-underline-style" to={`/movie_info/${crew.id}`}>{crew.title} </Link></div>
                                        <div className="py-3 col-md-3 text-center name-title-font-sz"> {crew.job} </div>
                                        <div className="py-3 col-md-3 name-title-font-sz">{crew.media_type} </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default People;