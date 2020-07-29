import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavBar from '../../NavBar'
import { Link } from 'react-router-dom';

function SeasonEpisodes(props) {

    const [episodeDetails, setEpisodeDetails] = useState([]);

    // Get Show's Details
    const fetchEpisodeDetails = () => {
        axios.get(`${process.env.REACT_APP_API}tv/${props.match.params.id}/season/${props.match.params.season_number}?api_key=2e7b1176bc4b39e965d3bc9552afd324&language=en-US`)
            .then(res => { setEpisodeDetails(res.data.episodes) })
            .catch(error => alert('Error fetching the episodes details.'))
    };

    useEffect(() => {
        fetchEpisodeDetails();
    }, []);

    return (
        <div className="bg-dark-2 pb-5">
            <NavBar />
            <div className="ml-5 mt-3" style={{ float: "left" }}>
                <Link className="btn btn-outline-dark text-light link-underline-style" to={`/TV_info/${props.match.params.id}`}>Previous Page...</Link>
            </div>
            <div className="container my-3">
                <h2 className="ml-4 text-center text-light">{props.match.params.tv_show_name}, Season {props.match.params.season_number}</h2>
                {episodeDetails && episodeDetails.map((episode, i) =>
                    <div className="container mt-3" key={i}>
                        <div className="card">
                            <div className="card-header card-header-font-sz text-white text-center bg-dark">
                                {episode.name}
                            </div>
                            <div className="card-body bg-dark-1 text-white">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={`https://image.tmdb.org/t/p/w300/${episode.still_path}`} alt="new" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row mb-1">
                                            Episode  {episode.episode_number}
                                        </div>
                                        <div className="row mb-1">
                                            Air Date: {episode.air_date}
                                        </div>
                                        <div className="row mb-1">
                                            {episode.crew.map((crew, i) => {
                                                return (crew.job === 'Director' ?
                                                    <div>{crew.job}:{crew.name}</div> : null)
                                            }
                                            )}
                                        </div>
                                        <div className="row mb-1">
                                            Overview: {episode.overview}
                                        </div>
                                        <div className="row mb-1 py-2">
                                            <Link className="btn btn-outline-dark text-light link-underline-style" to={`/episode/${props.match.params.tv_show_name}/${props.match.params.season_number}/${episode.episode_number}/${props.match.params.id}`}>
                                                Check episode details...
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SeasonEpisodes;