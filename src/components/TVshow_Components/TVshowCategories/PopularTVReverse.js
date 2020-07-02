import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
import NavBar from './../../../NavBar'
import { Link } from 'react-router-dom';

function PopularTVReverse(props) {
    var count = 0;
    const [popularTV, setpopularTV] = useState([]);
    const [popularTV2, setpopularTV2] = useState([]);
    const [popularTV3, setpopularTV3] = useState([]);

    const fetchpopularTV = () => {
        axios.get(`${process.env.REACT_APP_API}tv/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setpopularTV(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchpopularTV2 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setpopularTV2(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };
    const fetchpopularTV3 = () => {
        axios.get(`${process.env.REACT_APP_API}tv/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setpopularTV3(res.data) })
            .catch(error => alert('Error fetching the top rated movies.'))
    };

    useEffect(() => {
        fetchpopularTV();
    }, []);

    useEffect(() => {
        fetchpopularTV2();
    }, []);

    useEffect(() => {
        fetchpopularTV3();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5">Results: {(popularTV.page - 1) * 20 + 1} - {popularTV3.page * 20}</span>
                <Link to={`/tv_shows/popular_tv/page/${popularTV.page + 3}`}>
                    <button type="button" className="btn btn-dark">
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
                <span className="mr-5">Results: {(popularTV.page - 1) * 20 + 1} - {(popularTV.page - 1) * 20 + 1 + count}</span>
                <Link to={`/tv_shows/popular_tv/page/${popularTV.page - 3}`}>
                    <button type="button" className="btn btn-dark">
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
                <span className="mr-5">Results: {(popularTV.page - 1) * 20 + 1} - {popularTV3.page * 20}</span>
                <Link className="mr-5" to={`/tv_shows/popular_tv/page/${popularTV.page - 3}`}>
                    <button type="button" className="btn btn-dark">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link to={`/tv_shows/popular_tv/page/${popularTV.page + 3}`}>
                    <button type="button" className="btn btn-dark">
                        Next Page<i class="fas fa-angle-double-right ml-2"></i>
                    </button>
                </Link>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="container my-3">
                <div className="card">
                    <div className="card-header text-center">
                        Popular TV Shows
                    </div>
                    <div className="card-body">
                        {popularTV.results && popularTV.results.map((popularTV, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${popularTV.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popularTV.poster_path}`} alt="new" /> {popularTV.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {popularTV2.results && popularTV2.results.map((popularTV, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${popularTV.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popularTV.poster_path}`} alt="new" /> {popularTV.name}</Link>
                                </div>
                            )
                        }
                        )}
                        {popularTV3.results && popularTV3.results.map((popularTV, i) => {
                            count += 1;
                            return (
                                <div key={i} className="my-1">
                                    <Link to={`/tv_info/${popularTV.id}`}><img src={`https://image.tmdb.org/t/p/w45/${popularTV.poster_path}`} alt="new" /> {popularTV.name}</Link>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {popularTV.page == 1 && firstPage()}
                    {popularTV.page == 100 && lastPage()}
                    {popularTV.page != 1 && popularTV.page != 100 && renderPages()}
                </div>
            </div>
        </div>
    );
}

export default PopularTVReverse;