import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from './../../NavBar'
import { Link } from 'react-router-dom';

function PopularPeople(props) {

    const [popularPeople, setPopularPeople] = useState([]);
    const [popularPeople2, setPopularPeople2] = useState([]);
    const [popularPeople3, setPopularPeople3] = useState([]);

    const fetchPopularPeople = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${1}`)
            .then(res => { setPopularPeople(res.data.results) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople();
    }, []);

    const fetchPopularPeople2 = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${1}`)
            .then(res => { setPopularPeople2(res.data.results) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople2();
    }, []);

    const fetchPopularPeople3 = () => {
        axios.get(`${process.env.REACT_APP_API}person/popular?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US&page=${1}`)
            .then(res => { setPopularPeople3(res.data.results) })
            .catch(error => alert('Error fetching popular people.'))
    };

    useEffect(() => {
        fetchPopularPeople3();
    }, []);


    return (
        <div>
            <NavBar />
        </div>
    )

}

export default PopularPeople;