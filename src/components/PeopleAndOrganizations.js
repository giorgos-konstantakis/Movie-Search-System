import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import NavBar from '../NavBar'
import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function PeopleAndOrganizations() {

    const [popularPeople, setPopularPeople] = useState([]);
    const [modalPeople, setModalPeople] = useState(false);
    const [modalCompanies, setModalCompanies] = useState(false);
    const [modalNetworks, setModalNetworks] = useState(false);

    const fetchPopularPeople = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${1}`)
            .then(res => { setPopularPeople(res.data.results) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople();
    }, []);

    // Search Modal Closer and Opener
    function openModalPeople() {
        setModalPeople(true);
    }

    function closeModalPeople() {
        setModalPeople(false);
    }

    function openModalCompanies() {
        setModalCompanies(true);
    }

    function closeModalCompanies() {
        setModalCompanies(false);
    }

    function openModalNetworks() {
        setModalNetworks(true);
    }

    function closeModalNetworks() {
        setModalNetworks(false);
    }

    let settingsSlider = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <NavBar />
            <div className="container my-3">

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center">
                                Popular People
                            </div>
                            <div className="card-body bg-dark">
                                <Slider {...settingsSlider}>
                                    {popularPeople && popularPeople.map((person, i) =>
                                        <div key={i}>
                                            <div className="card-title text-center text-light">{person.name}</div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <img src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`} alt="new" />
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="row mb-1 text-light">
                                                        Department: {person.known_for_department}
                                                    </div>
                                                    <div className="row mb-4 text-light">
                                                        Gender: {person.gender == 2 ? 'male' : 'female'}
                                                    </div>
                                                    <div className="row mb-1 text-light">
                                                        Known For:
                                                        <ul>
                                                            {person.known_for && person.known_for.map((credit, j) => {
                                                                return credit.media_type == 'movie' ? <li key={j}>{credit.title}</li> : <li key={j}>{credit.name}</li>
                                                            }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Slider>
                            </div>
                            <div className="card-footer text-center">
                                <Link to={`/people_and_organizations/popular_people/page/${1}`}>See More Popular People</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PeopleAndOrganizations;

