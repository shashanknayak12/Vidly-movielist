import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    MoviesList
                </Link>


            </div>
        </nav>
    );
}

export default Navbar;