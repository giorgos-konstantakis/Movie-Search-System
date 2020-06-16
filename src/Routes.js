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
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;