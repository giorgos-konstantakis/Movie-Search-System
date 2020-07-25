import React from 'react'
import { Link } from 'react-router-dom'
import './styles/styles.css';
import './styles/navBar.css';


const Nav = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark-3">
        <div className="container py-3">
            <Link to="/" className="navbar-brand p-2 text-white navbar-brand-style">Movie Searcher</Link>
            <button className="navbar-toggler" dataToggle="collapse" dataTarget="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div style={{ float: "right" }} className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item p-1 mr-3 nav-item-style">
                        <Link to="/movies" className="text-light link-underline-style">Movies</Link>
                    </li>
                    <li className="nav-item p-1 mr-3 nav-item-style">
                        <Link to="/tv_shows" className="text-light link-underline-style">TV shows</Link>
                    </li>
                    <li className="nav-item p-1 mr-3 nav-item-style">
                        <Link to="/people_and_organizations" className="text-light link-underline-style">People and Organizations</Link>
                    </li>
                    <li className="nav-item p-1 nav-item-style">
                        <Link to="/contact_me" className="text-light link-underline-style">Contact Me</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Nav;