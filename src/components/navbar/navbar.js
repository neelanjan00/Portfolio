import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getHomeIcon, getBlogIcon, getProjectIcon, getContactMeIcon, getLogoutIcon, getHamburgerIcon } from '../../assets/inline-svgs'
import { auth } from '../../services/firebase'
import MobileNavbarTile from '../mobile-navbar-tile/mobile-navbar-tile'

import useWindowSize from '../../hooks/useWindow'

const Navbar = (props) => {

    var [sidebarState, setSidebarState] = useState({ sidebarDisplay: 'none' })
    var [topScroll, setTopScroll] = useState(window.scrollY)

    const location = useLocation();

    const history = useHistory()
    const [width] = useWindowSize()

    const logoutHandler = event => {
        event.preventDefault()
        auth.signOut().then(() => history.push('/'))
    }

    const hamburgerToggler = () => {
        sidebarState.sidebarDisplay === 'none' ?
            setSidebarState({ sidebarDisplay: 'block' }) : setSidebarState({ sidebarDisplay: 'none' })
    }

    const handleScroll = () => {
        setTopScroll(window.scrollY)
    }

    const scrollToBottom = () => {
        window.scroll({
            top: document.body.offsetHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

    const contactMeMobileView = () => {
        scrollToBottom()
        setSidebarState({ sidebarDisplay: 'none' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    var navbarStyle = {
        position: 'fixed',
        zIndex: '2',
        color: 'white',
        minWidth: '100%',
        backgroundColor: location.pathname === '/' ? (topScroll > 700 ? 'black' : 'transparent') : 'black'
    }

    if (width >= 1280) {
        return (
            <>
            <div style={navbarStyle} className="pr-5 p-3">
                <div style={{ float: 'right' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Home</h5>
                        </span>
                    </Link>
                    <Link to="/blog" style={{ textDecoration: 'none' }}>
                        <span className="ml-5" style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Blogs</h5>
                        </span>
                    </Link>
                    <Link to="/projects" style={{ textDecoration: 'none' }}>
                        <span className="ml-5" style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Projects</h5>
                        </span>
                    </Link>
                    <span className="ml-5" style={{ color: 'white', cursor: 'pointer' }}>
                        <h5 style={{ display: 'inline' }} onClick={scrollToBottom}>Contact Me</h5>
                    </span>
                    {
                        auth.currentUser === null 
                            ? null 
                            : <span className="ml-5" onClick={logoutHandler} style={{ color: 'white', cursor: 'pointer' }}>
                                <h5 style={{ display: 'inline' }}>Logout</h5>
                            </span>
                    }
                </div>
            </div>
            {
                location.pathname === '/' 
                    ? null
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
                    </svg>
            }
            </>
        )
    } else {
        return (
            <React.Fragment>
                <div className="p-2" style={{
                    minWidth: '100vw', backgroundColor: 'black',
                    position: 'sticky', top: '0', zIndex: '3'
                }} >
                    <span onClick={hamburgerToggler}>
                        {getHamburgerIcon('white')}
                    </span>
                </div>

                { sidebarState.sidebarDisplay === 'block' ? (
                    <div style={{
                        zIndex: '2', minHeight: '100vh', width: '65vw',
                        backgroundColor: 'black', position: 'fixed'
                    }}>
                        <Link to="/"><MobileNavbarTile icon={getHomeIcon('white')} label="Home" highlightNavigation={location.pathname === '/' ? true : false} /></Link>
                        <Link to="/blog"><MobileNavbarTile icon={getBlogIcon('white')} label="Blogs" highlightNavigation={location.pathname.includes('blog') ? true : false} /></Link>
                        <Link to="/projects"><MobileNavbarTile icon={getProjectIcon('white')} label="Project" highlightNavigation={location.pathname === '/projects' ? true : false} /></Link>
                        <MobileNavbarTile icon={getContactMeIcon('white')} label="Contact Me" clickHandler={contactMeMobileView} />
                        {
                            auth.currentUser === null 
                                ? null 
                                : <MobileNavbarTile icon={getLogoutIcon('white')} label="Logout" clickHandler={logoutHandler} />
                        }
                    </div>
                ) : null}
                {
                    location.pathname === '/' 
                        ? null
                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
                        </svg>
                }
            </React.Fragment>
        )
    }
}

export default Navbar;