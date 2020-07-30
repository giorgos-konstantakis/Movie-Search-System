import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function OnTheAirTV(props) {
    var count = 0;
    const [onTheAir, setonTheAir] = useState([]);
    const [onTheAir2, setonTheAir2] = useState([]);
    const [onTheAir3, setonTheAir3] = useState([]);

    const fetchOnTheAir = () => {
        axios.get(`${process.env.REACT_APP_API}tv/on_the_air?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setonTheAir(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchOnTheAir2 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/on_the_air?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setonTheAir2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchOnTheAir3 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/on_the_air?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setonTheAir3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchOnTheAir();
    }, []);

    useEffect(() => {
        fetchOnTheAir2();
    }, []);

    useEffect(() => {
        fetchOnTheAir3();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(onTheAir.page - 1) * 20 + 1} - {onTheAir3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/tv_shows/on_the_air_tv_reverse/page/${onTheAir.page + 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(onTheAir.page - 1) * 20 + 1} - {(onTheAir.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/tv_shows/on_the_air_tv_reverse/page/${onTheAir.page - 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(onTheAir.page - 1) * 20 + 1} - {onTheAir3.page * 20}</span>
                <Link className="mr-5 card-header-font-sz" to={`/tv_shows/on_the_air_tv_reverse/page/${onTheAir.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/tv_shows/on_the_air_tv_reverse/page/${onTheAir.page + 3}`}>
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
                        On The Air ( week )
                    </div>
                    <div className="card-body bg-dark-1 text-white">
                        {onTheAir.results && onTheAir.results.map((onTheAir, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${onTheAir.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${onTheAir.poster_path}`} alt="new" /> {onTheAir.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {onTheAir2.results && onTheAir2.results.map((onTheAir, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${onTheAir.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${onTheAir.poster_path}`} alt="new" /> {onTheAir.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {onTheAir3.results && onTheAir3.results.map((onTheAir, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1 py-2">
                                    <Link className="text-light link-underline-style name-title-font-sz" to={`/tv_info/${onTheAir.id}`}><img className="photo-opac" src={`https://image.tmdb.org/t/p/w45/${onTheAir.poster_path}`} alt="new" /> {onTheAir.name}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {onTheAir.page == 1 && firstPage()}
                    {onTheAir.page == 13 && lastPage()}
                    {onTheAir.page != 1 && onTheAir.page != 13 && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default OnTheAirTV;