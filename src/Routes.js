import React from 'react'
import { BrowserRouter, Switch, Route, withRouter } from 'react-router-dom'
import App from './App'
import ContactMe from './components/ContactMe'
import Movies from './components/Movies'
import TVshows from './components/TVshows'
import ActorsAndStuff from './components/ActorsAndStuff'
import TVshowInfo from './components/TVshow_Components/TVshowInfo'
import TVshowInfoReverse from './components/TVshow_Components/TVshowInfoReverse'
import MovieInfo from './components/Movie_Components/MovieInfo'
import MovieInfoReverse from './components/Movie_Components/MovieInfoReverse'
import SeasonEpisodes from './components/TVshow_Components/SeasonEpisodes'
import Episode from './components/TVshow_Components/Episode'
import People from './components/Cast_Crew_Components/People'
import TopRatedMovies from './components/Movie_Components/MovieCategories/TopRatedMovies'
import TopRatedMoviesReverse from './components/Movie_Components/MovieCategories/TopRatedMoviesReverse'
import TopRatedMoviesByGenre from './components/Movie_Components/MovieCategories/TopRatedMoviesByGenre'
import TopRatedMoviesByGenreReverse from './components/Movie_Components/MovieCategories/TopRatedMoviesByGenreReverse'
import PopularMovies from './components/Movie_Components/MovieCategories/PopularMovies'
import NowPlayingMovies from './components/Movie_Components/MovieCategories/NowPlayingMovies'
import UpcomingMovies from './components/Movie_Components/MovieCategories/UpcomingMovies'

// Pages' Routes
const Routes = () => {
    return (
        <BrowserRouter >
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/movies" exact component={Movies} />
                <Route path="/tv_shows" exact component={TVshows} />
                <Route path="/actors_and_stuff" exact component={ActorsAndStuff} />
                <Route path="/contact_me" exact component={ContactMe} />
                <Route path="/tv_info/:id" exact component={TVshowInfo} />
                <Route path="/tv_info_reverse/:id" exact component={TVshowInfoReverse} />
                <Route path="/movie_info/:id" exact component={MovieInfo} />
                <Route path="/movie_info_reverse/:id" exact component={MovieInfoReverse} />
                <Route path="/episodes/:tv_show_name/:season_number/:id" exact component={SeasonEpisodes} />
                <Route path="/episode/:tv_show_name/:season_number/:episode_number/:id" exact component={Episode} />
                <Route path="/people/:id" exact component={People} />
                <Route path="/movies/top_rated_movies/page/:page" exact component={TopRatedMovies} />
                <Route path="/movies/top_rated_movies_reverse/page/:page" exact component={TopRatedMoviesReverse} />
                <Route path="/top_rated_movies_by_genre/page/:page/genre_id/:genre_id/genre_name/:genre_name" exact component={TopRatedMoviesByGenre} />
                <Route path="/top_rated_movies_by_genre_reverse/page/:page/genre_id/:genre_id/genre_name/:genre_name" exact component={TopRatedMoviesByGenreReverse} />
                <Route path="/movies/popular_movies" exact component={PopularMovies} />
                <Route path="/movies/now_playing_movies" exact component={NowPlayingMovies} />
                <Route path="/movies/upcoming_movies" exact component={UpcomingMovies} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;