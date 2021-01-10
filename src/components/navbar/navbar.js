import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'

const Navbar = (props) => {

    var [sidebarState, setSidebarState] = useState({ sidebarDisplay: 'none' })
    var [topScroll, setTopScroll] = useState(window.scrollY)

    const hamburgerToggler = () => {
        sidebarState.sidebarDisplay === 'none' ? 
            setSidebarState({ sidebarDisplay: 'block' }) : setSidebarState({ sidebarDisplay: 'none' })
    }

    const handleScroll = () => {
        setTopScroll(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return() => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    var navbarStyle = { 
        position: 'fixed', 
        zIndex: '2', 
        color: 'white',
        minWidth: '100%',
        backgroundColor: props.source === 'home' ? (topScroll > 500 ? 'black' : 'transparent') : 'black'
    }

    if(window.screen.width >= 1280) {
        return (
            <div style={navbarStyle} className= "pr-5 p-3">
                <div style={{ float: 'right' }}>
                    <Link to="/">
                        <span style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Home</h5>
                        </span>
                    </Link>
                    <Link to="/blogs">
                        <span className="ml-5" style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Blogs</h5>
                        </span>
                    </Link>
                    <Link to="/projects">
                        <span className="ml-5" style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Projects</h5>
                        </span>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <div className="p-2" style={{
                    minWidth: '100vw', backgroundColor: 'white',
                    position: 'sticky', top: '0', zIndex: '3' }} >
                    <span onClick={hamburgerToggler}>
                        <svg width="2.2em" height="2.2em" viewBox="0 0 16 16" className="bi bi-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </span>
                </div>
    
                { sidebarState.sidebarDisplay === 'block' ? (
                    <div style={{ zIndex: '2', minHeight: '100vh', width: '50vw',
                                  backgroundColor: 'grey', position: 'fixed' }}>
                        <Link to="/">
                            <div style={{ backgroundColor: 'darkgrey', color: 'white', display: 'flex' }}
                                className="p-3">
                                <span>
                                    <svg width="1.3em" height="1.3em" viewBox="0 0 16 16" className="bi bi-house-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                                    </svg>
                                </span>
                                <p className="pl-4">Home</p>
                            </div>
                        </Link>
                        <Link to="/projects">
                            <div style={{ backgroundColor: 'darkgrey', color: 'white', display: 'flex' }}
                                className="p-3">
                                <span>
                                    <img src={require('../../assets/images/rocket.svg')} width="20" alt="rocket" />
                                </span>
                                <p className="pl-4">Projects</p>
                            </div>
                        </Link>
                    </div>
                ) : null }
            </React.Fragment>
        )
    }
}

export default Navbar;