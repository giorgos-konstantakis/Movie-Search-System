import React from 'react'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import App from './App'
import Movies from './components/Movies'
import TVshows from './components/TVshows'
import PeopleAndOrganizations from './components/PeopleAndOrganizations'
import TVshowInfo from './components/TVshow_Components/TVshowInfo'
import TVshowInfoReverse from './components/TVshow_Components/TVshowInfoReverse'
import MovieInfo from './components/Movie_Components/MovieInfo'
import MovieInfoReverse from './components/Movie_Components/MovieInfoReverse'
import SeasonEpisodes from './components/TVshow_Components/SeasonEpisodes'
import Episode from './components/TVshow_Components/Episode'
import People from './components/Cast_Crew_Components/People'
import TopRatedMovies from './components/Movie_Components/MovieCategories/TopRatedMovies'
import TopRatedMoviesReverse from './components/Movie_Components/MovieCategories/TopRatedMoviesReverse'
import PopularMovies from './components/Movie_Components/MovieCategories/PopularMovies'
import PopularMoviesReverse from './components/Movie_Components/MovieCategories/PopularMoviesReverse'
import NowPlayingMovies from './components/Movie_Components/MovieCategories/NowPlayingMovies'
import NowPlayingMoviesReverse from './components/Movie_Components/MovieCategories/NowPlayingMoviesReverse'
import UpcomingMovies from './components/Movie_Components/MovieCategories/UpcomingMovies'
import UpcomingMoviesReverse from './components/Movie_Components/MovieCategories/UpcomingMoviesReverse'
import AiringTonightTV from './components/TVshow_Components/TVshowCategories/AiringTonightTV'
import AiringTonightTVReverse from './components/TVshow_Components/TVshowCategories/AiringTonightTVReverse'
import OnTheAirTV from './components/TVshow_Components/TVshowCategories/OnTheAirTV'
import OnTheAirTVReverse from './components/TVshow_Components/TVshowCategories/OnTheAirTVReverse'
import TopRatedTV from './components/TVshow_Components/TVshowCategories/TopRatedTV'
import TopRatedTVReverse from './components/TVshow_Components/TVshowCategories/TopRatedTVReverse'
import PopularTV from './components/TVshow_Components/TVshowCategories/PopularTV'
import PopularTVReverse from './components/TVshow_Components/TVshowCategories/PopularTVReverse'
import PopularPeople from './components/Cast_Crew_Components/PopularPeople'
import PopularPeopleReverse from './components/Cast_Crew_Components/PopularPeopleReverse'

// Pages' Routes
const Routes = () => {
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/movies" exact component={Movies} />
                <Route path="/tv_shows" exact component={TVshows} />
                <Route path="/people_and_organizations" exact component={PeopleAndOrganizations} />
                <Route path="/tv_info/:id" exact component={TVshowInfo} />
                <Route path="/tv_info_reverse/:id" exact component={TVshowInfoReverse} />
                <Route path="/movie_info/:id" exact component={MovieInfo} />
                <Route path="/movie_info_reverse/:id" exact component={MovieInfoReverse} />
                <Route path="/episodes/:tv_show_name/:season_number/:id" exact component={SeasonEpisodes} />
                <Route path="/episode/:tv_show_name/:season_number/:episode_number/:id" exact component={Episode} />
                <Route path="/people/:id" exact component={People} />
                <Route path="/movies/top_rated_movies/page/:page" exact component={TopRatedMovies} />
                <Route path="/movies/top_rated_movies_reverse/page/:page" exact component={TopRatedMoviesReverse} />
                <Route path="/movies/popular_movies/page/:page" exact component={PopularMovies} />
                <Route path="/movies/popular_movies_reverse/page/:page" exact component={PopularMoviesReverse} />
                <Route path="/movies/now_playing_movies/page/:page" exact component={NowPlayingMovies} />
                <Route path="/movies/now_playing_movies_reverse/page/:page" exact component={NowPlayingMoviesReverse} />
                <Route path="/movies/upcoming_movies/page/:page" exact component={UpcomingMovies} />
                <Route path="/movies/upcoming_movies_reverse/page/:page" exact component={UpcomingMoviesReverse} />
                <Route path="/tv_shows/top_rated_tv/page/:page" exact component={TopRatedTV} />
                <Route path="/tv_shows/top_rated_tv_reverse/page/:page" exact component={TopRatedTVReverse} />
                <Route path="/tv_shows/popular_tv/page/:page" exact component={PopularTV} />
                <Route path="/tv_shows/popular_tv_reverse/page/:page" exact component={PopularTVReverse} />
                <Route path="/tv_shows/on_the_air_tv/page/:page" exact component={OnTheAirTV} />
                <Route path="/tv_shows/on_the_air_tv_reverse/page/:page" exact component={OnTheAirTVReverse} />
                <Route path="/tv_shows/airing_tonight_tv/page/:page" exact component={AiringTonightTV} />
                <Route path="/tv_shows/airing_tonight_tv_reverse/page/:page" exact component={AiringTonightTVReverse} />
                <Route path="/people_and_organizations/popular_people/page/:page" exact component={PopularPeople} />
                <Route path="/people_and_organizations/popular_people_reverse/page/:page" exact component={PopularPeopleReverse} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;