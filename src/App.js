import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
    <div>
      <NavBar />
      <div className="container my-3">
        <h2 className="ml-4 text-center">Trending Today</h2>
        {
          trendingInfo.map((trending, index) => (
            <div className="container mt-3" key={trending.id}>
              <div className="card">
                <div className="card-header text-center">
                  {trending.title}
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img src={`https://image.tmdb.org/t/p/w185/${trending.poster_path}`} alt="new" />
                    </div>
                    <div className="col-md-9">
                      <div className="row mb-1">
                        Release Date: {trending.release_date}
                      </div>
                      <div className="row mb-1">
                        Media Type:  {trending.media_type}
                      </div>
                      <div className="row mb-1">
                        Original Language: {trending.original_language}
                      </div>
                      <div className="row">
                        Overview: <br />
                        {trending.overview}
                      </div>
                      <div className="row mt-4">
                        <Link to={`/${trending.media_type}_info/${trending.id}`}>See More ...</Link>
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
