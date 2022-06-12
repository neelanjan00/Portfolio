import { useHistory, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import React, { useState, useEffect, useRef } from 'react'
import { getBlogIcon, getProjectIcon, getContactMeIcon, getLogoutIcon, getHamburgerIcon, getAboutMeIcon, getTalksIcon } from '../../assets/inline-svgs'
import { auth } from '../../services/firebase'
import MobileNavbarTile from '../mobile-navbar-tile/mobile-navbar-tile'

import useWindowSize from '../../hooks/useWindow'
import useOutsideClick from '../../hooks/useClickOutside'
import Header from '../../headers/default-header'

const Navbar = () => {

    var [displaySidebar, setDisplaySidebar] = useState(false)
    var [topScroll, setTopScroll] = useState(window.scrollY)

    const location = useLocation();

    const history = useHistory()
    const [width] = useWindowSize()

    const sidebarRef = useRef();
    const hamburgerIconRef = useRef();

    const isClickedOutside = useOutsideClick(sidebarRef, hamburgerIconRef)

    useEffect(() => {
        if (isClickedOutside && displaySidebar)
            setDisplaySidebar(false)
    }, [isClickedOutside, displaySidebar])

    const logoutHandler = event => {
        event.preventDefault()
        auth.signOut().then(() => history.push('/'))
    }

    const hamburgerToggler = () => {
        setDisplaySidebar(!displaySidebar)
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

    const contactMeMobileView = event => {
        event.preventDefault()
        scrollToBottom()
        setDisplaySidebar(false)
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
                <Header />
                <div style={navbarStyle} className="pr-5 p-3">
                    <HashLink smooth to="/#" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white' }}>
                            <h3 style={{ fontWeight: '500', display: 'inline' }}>Neelanjan Manna</h3>
                        </span>
                    </HashLink>
                    <div style={{ float: 'right' }}>
                        <HashLink smooth to="/#about-me" style={{ textDecoration: 'none' }}>
                            <span style={{ color: 'white' }}>
                                <h5 style={{ display: 'inline' }}>About Me</h5>
                            </span>
                        </HashLink>
                        <HashLink smooth to="/#my-talks" style={{ textDecoration: 'none' }}>
                            <span className='ml-5' style={{ color: 'white' }}>
                                <h5 style={{ display: 'inline' }}>Talks</h5>
                            </span>
                        </HashLink>
                        <HashLink smooth to="/blog#" style={{ textDecoration: 'none' }}>
                            <span className="ml-5" style={{ color: 'white', textDecoration: location.pathname.includes('blog') ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>Blogs</h5>
                            </span>
                        </HashLink>
                        <HashLink smooth to="/projects#" style={{ textDecoration: 'none' }}>
                            <span className="ml-5" style={{ color: 'white', textDecoration: location.pathname === '/projects' ? 'underline' : 'none', textUnderlineOffset: '5px' }}>
                                <h5 style={{ display: 'inline' }}>Projects</h5>
                            </span>
                        </HashLink>
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
            <>
                <Header />
                <div className="p-2" ref={hamburgerIconRef} style={{
                    minWidth: '100vw', backgroundColor: 'black',
                    position: 'sticky', top: '0', zIndex: '3'
                }} >
                    <span onClick={hamburgerToggler}>
                        {getHamburgerIcon('white')}
                    </span>
                </div>
                <div ref={sidebarRef} style={{
                    zIndex: '2', minHeight: '100vh', width: displaySidebar ? '250px' : '0',
                    backgroundColor: 'black', position: 'fixed', transition: '0.3s'
                }}>
                    <div style={{ display: displaySidebar ? 'grid' : 'none', placeItems: 'center', minHeight: '100px' }} className='my-5'>
                        <HashLink smooth to="/#" style={{ textDecoration: 'none' }}>
                            <img className='img-fluid' style={{ width: '100px' }} src='/favicon.ico' alt='logo' />
                        </HashLink>
                    </div>
                    <MobileNavbarTile icon={getAboutMeIcon('white')} label="About Me" route="/#about-me" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getTalksIcon('white')} label="Talks" route="/#my-talks" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getBlogIcon('white')} label="Blogs" highlightNavigation={location.pathname.includes('blog')} route="/blog#" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getProjectIcon('white')} label="Project" highlightNavigation={location.pathname === '/projects'} route="/projects#" displaySidebar={displaySidebar} />
                    <MobileNavbarTile icon={getContactMeIcon('white')} label="Contact Me" clickHandler={contactMeMobileView} displaySidebar={displaySidebar} />

                    {
                        auth.currentUser === null
                            ? null
                            : <MobileNavbarTile icon={getLogoutIcon('white')} label="Logout" clickHandler={logoutHandler} displaySidebar={displaySidebar} />
                    }
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
    }
}

export default Navbar;