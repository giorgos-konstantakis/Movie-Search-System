import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function AiringTonightTV(props) {
    var count = 0;
    const [airingTonight, setairingTonight] = useState([]);
    const [airingTonight2, setairingTonight2] = useState([]);
    const [airingTonight3, setairingTonight3] = useState([]);

    const fetchAiringTonight = () => {
        axios.get(`${process.env.REACT_APP_API}tv/airing_today?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setairingTonight(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchAiringTonight2 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/airing_today?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setairingTonight2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchAiringTonight3 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/airing_today?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setairingTonight3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchAiringTonight();
    }, []);

    useEffect(() => {
        fetchAiringTonight2();
    }, []);

    useEffect(() => {
        fetchAiringTonight3();
    }, []);

    console.log(airingTonight3.page)

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(airingTonight.page - 1) * 20 + 1} - {airingTonight3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/tv_shows/airing_tonight_tv_reverse/page/${airingTonight.page + 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(airingTonight.page - 1) * 20 + 1} - {(airingTonight.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/tv_shows/airing_tonight_tv_reverse/page/${airingTonight.page - 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(airingTonight.page - 1) * 20 + 1} - {airingTonight3.page * 20}</span>
                <Link className="mr-5 card-header-font-sz" to={`/tv_shows/airing_tonight_tv_reverse/page/${airingTonight.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/tv_shows/airing_tonight_tv_reverse/page/${airingTonight.page + 3}`}>
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
                        TV : Airing Tonight
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {airingTonight.results && airingTonight.results.map((airingToninght, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${airingToninght.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${airingToninght.poster_path}`} alt="new" /> {airingToninght.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {airingTonight2.results && airingTonight2.results.map((airingToninght, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${airingToninght.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${airingToninght.poster_path}`} alt="new" /> {airingToninght.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {airingTonight3.results && airingTonight3.results.map((airingToninght, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${airingToninght.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${airingToninght.poster_path}`} alt="new" /> {airingToninght.name}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {airingTonight.page == 1 && firstPage()}
                    {airingTonight.page == 4 && lastPage()}
                    {airingTonight.page != 1 && airingTonight.page != 4 && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default AiringTonightTV;