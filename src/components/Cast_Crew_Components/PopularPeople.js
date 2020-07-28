import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './../../NavBar'
import { Link } from 'react-router-dom';

function PopularPeople(props) {
    var count = 0;

    const [popularPeople, setPopularPeople] = useState([]);
    const [popularPeople2, setPopularPeople2] = useState([]);
    const [popularPeople3, setPopularPeople3] = useState([]);

    const fetchPopularPeople = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${props.match.params.page}`)
            .then(res => { setPopularPeople(res.data) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople();
    }, []);

    const fetchPopularPeople2 = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 1}`)
            .then(res => { setPopularPeople2(res.data) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople2();
    }, []);

    const fetchPopularPeople3 = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${parseInt(props.match.params.page) + 2}`)
            .then(res => { setPopularPeople3(res.data) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople3();
    }, []);

    // Setting buttons for changing pages in page No 1
    const firstPage = () => {
        return (
            <div className="text-center col-md-12">
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularPeople.page - 1) * 20 + 1} - {popularPeople3.page * 20}</span>
                <Link className="card-header-font-sz" to={`/people_and_organizations/popular_people_reverse/page/${popularPeople.page + 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularPeople.page - 1) * 20 + 1} - {(popularPeople3.page - 1) * 20 + 1 + count}</span>
                <Link className="card-header-font-sz" to={`/people_and_organizations/popular_people_reverse/page/${popularPeople.page - 3}`}>
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
                <span className="mr-5 card-header-font-sz text-white">Results: {(popularPeople.page - 1) * 20 + 1} - {popularPeople3.page * 20}</span>
                <Link className="mr-5 card-header-font-sz" to={`/people_and_organizations/popular_people_reverse/page/${popularPeople.page - 3}`}>
                    <button type="button" className="btn btn-outline-dark card-header-font-sz text-white p-2">
                        <i class="fas fa-angle-double-left mr-2"></i>Previous Page
                </button>
                </Link>
                <Link className="card-header-font-sz" to={`/people_and_organizations/popular_people_reverse/page/${popularPeople.page + 3}`}>
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
                        Popular People
                    </div>
                    <div className="card-body bg-dark-1">
                        <div className="row">
                            <div className="col-md-4">
                                {popularPeople.results && popularPeople.results.map((popular, i) => {
                                    count += 1;
                                    console.log(popular.profile_path)
                                    return (!popular.profile_path ?
                                        <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <img style={{ width: "300px", height: "450px" }} src={`https://tanzolymp.com/images/default-non-user-no-photo-1.jpg`} alt="" />
                                            </div>
                                        </div>
                                        : <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <Link to={`/people/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w300/${popular.profile_path}`} /></Link>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                            <div className="col-md-4">
                                {popularPeople2.results && popularPeople2.results.map((popular, i) => {
                                    count += 1;
                                    return (!popular.profile_path ?
                                        <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <img style={{ width: "300px", height: "450px" }} src={`https://tanzolymp.com/images/default-non-user-no-photo-1.jpg`} alt="" />
                                            </div>
                                        </div>
                                        : <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <Link to={`/people/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w300/${popular.profile_path}`} /></Link>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                            <div className="col-md-4">
                                {popularPeople3.results && popularPeople3.results.map((popular, i) => {
                                    count += 1;
                                    return (!popular.profile_path ?
                                        <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <img style={{ width: "300px", height: "450px" }} src={`https://tanzolymp.com/images/default-non-user-no-photo-1.jpg`} alt="" />
                                            </div>
                                        </div>
                                        : <div key={i} className="card mb-2">
                                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                                <Link className="text-white link-underline-style" to={`/people/${popular.id}`}>{popular.name}</Link>
                                            </div>
                                            <div className="card-body bg-dark-1">
                                                <Link to={`/people/${popular.id}`}><img src={`https://image.tmdb.org/t/p/w300/${popular.profile_path}`} /></Link>
                                            </div>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-5 mt-3">
                    {popularPeople.page == 1 && firstPage()}
                    {popularPeople.page == 85 && lastPage()}
                    {popularPeople.page != 1 && popularPeople.page != 85 && renderPages()}
                </div>
            </div>
        </div>
    )

}

export default PopularPeople;