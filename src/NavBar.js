import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container py-1">
            <Link to="/" className="navbar-brand p-2" style={navbarBrand}>Movie Searcher</Link>
            <button className="navbar-toggler" dataToggle="collapse" dataTarget="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div style={{ float: "right" }} className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item p-1 mr-3" style={navItem}>
                        <Link to="/movies" className="text-light">Movies</Link>
                    </li>
                    <li className="nav-item p-1 mr-3" style={navItem}>
                        <Link to="/tv_shows" className="text-light">TV shows</Link>
                    </li>
                    <li className="nav-item p-1 mr-3" style={navItem}>
                        <Link to="/people_and_organizations" className="text-light">People and Organizations</Link>
                    </li>
                    <li className="nav-item p-1" style={navItem}>
                        <Link to="/contact_me" className="text-light">Contact Me</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

const navbarBrand = {
    fontSize: '40px',
    fontColor: '#fff',
    backgroundColor: '#660000',
    border: '1px solid #660000',
    borderRadius: '10px',
    boxShadow: '7px 7px 5px #330000'
};

const navItem = {
    fontSize: '20px',
    backgroundColor: '#660000',
    border: '1px solid #660000',
    borderRadius: '10px',
    boxShadow: '7px 7px 5px #330000'
};

export default Nav;