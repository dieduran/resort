import React, { useState } from 'react'
import logo from '../images/logo.svg'
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export const Navbar = () => {

    const [state, setState] = useState({
            isOpen: false,}
        )

    const handleToggle= () =>{
         setState( (prev)=> ({
            isOpen: !prev.isOpen}))
    }

    return (
        <nav className="navbar">
            <div className="nav-center">
                <div className="nav-header">
                    <Link  to="/">
                        <img src={logo} alt="Beach Resort"></img>
                    </Link>
                    <button type="button" className="nav-btn" onClick={handleToggle} >
                        <FaAlignRight className="nav-icon" />
                    </button>
                </div>
                <ul className={state.isOpen?"nav-links show-nav":"nav-links"}>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/rooms">Rooms</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}