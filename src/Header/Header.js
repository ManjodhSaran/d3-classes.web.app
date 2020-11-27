import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './Header.css'
const Header = () => {

    const [active, setActive] = useState(window.location.pathname);

    useEffect(() => {
        const interval = setInterval(
            () => setActive(window.location.pathname),
            10
        );

        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div className="header">
            <h1 className="noselect">D3-CS C</h1>
            <hr />
            <div className="header__nav">
                <Link to='/'><p className={active === '/' ? "active" : ""}>Home</p></Link>
                <Link to='/attendence'><p className={active === '/attendence' ? "active" : ""}>Attendence Links</p></Link>
                <Link to='/timetable'><p className={active === '/timetable' ? "active" : ""}>Time Table</p></Link>
            </div>
        </div>
    )
}

export default Header
