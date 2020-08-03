import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './styles/styles.css';

function App() {

  const [trendingInfo, setTrendingInfo] = useState([]);

  // Get Trending Today
  const fetchTrendingInfo = () => {
    axios.get(`${process.env.REACT_APP_API}trending/all/day?api_key=2e7b1176bc4b39e965d3bc9552afd324`)
      .then(res => { setTrendingInfo(res.data.results) })
      .catch(error => alert('Error fetching the trending news.'))
  };

  useEffect(() => {
    fetchTrendingInfo();
  }, []);


  console.log(trendingInfo)
  return (
    <div className="bg-dark-2 pb-5">
      <NavBar />
      <div className="container mt-3 pb-3 bg-dark-2">
        <h2 className="ml-2 py-3 text-center text-light page-title bg-dark-1 border-info border-thickness">Trending Today</h2>
        {
          trendingInfo.map((trending, index) => (
            <div className="container mt-3" key={trending.id}>
              <div className="card border-info border-thickness">
                <div className="card-header card-header-font-sz text-white text-center bg-dark">
                  {trending.media_type === 'tv' ? trending.name : trending.title}
                </div>
                <div className="card-body bg-dark-1">
                  <div className="row">
                    <div className="col-md-3">
                      <img src={`https://image.tmdb.org/t/p/w185/${trending.poster_path}`} alt="new" />
                    </div>
                    <div className="col-md-9">
                      <div className="row mb-1 text-light">
                        Release Date: {trending.release_date}
                      </div>
                      <div className="row mb-1 text-light">
                        Media Type: {trending.media_type}
                      </div>
                      <div className="row mb-1 text-light">
                        Original Language: {trending.original_language}
                      </div>
                      <div className="row text-light">
                        Overview: <br />
                        {trending.overview}
                      </div>
                      <div className="row mt-4">
                        <Link className="btn btn-outline-dark text-light link-underline-style border-info border-thickness" to={`/${trending.media_type}_info/${trending.id}`} style={{ fontSize: '20px' }}>See More ...</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
