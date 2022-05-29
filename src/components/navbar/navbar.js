import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getHomeIcon, getBlogIcon, getProjectIcon, getContactMeIcon } from '../../assets/inline-svgs'

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
        backgroundColor: props.source === 'home' ? (topScroll > 500 ? 'black' : 'transparent') : 'black'
    }

    if (window.screen.width >= 1280) {
        return (
            <div style={navbarStyle} className="pr-5 p-3">
                <div style={{ float: 'right' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ color: 'white' }}>
                            <h5 style={{ display: 'inline' }}>Home</h5>
                        </span>
                    </Link>
                    <Link to="/blogs" style={{ textDecoration: 'none' }}>
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
                </div>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <div className="p-2" style={{
                    minWidth: '100vw', backgroundColor: 'black',
                    position: 'sticky', top: '0', zIndex: '3'
                }} >
                    <span onClick={hamburgerToggler}>
                        <svg width="2.2em" height="2.2em" viewBox="0 0 16 16" className="bi bi-list" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </span>
                </div>

                { sidebarState.sidebarDisplay === 'block' ? (
                    <div style={{
                        zIndex: '2', minHeight: '100vh', width: '65vw',
                        backgroundColor: 'black', position: 'fixed'
                    }}>
                        <Link to="/">
                            <div style={{ padding: '10px' }}>
                                <div style={{
                                    backgroundColor: props.source === 'home' ? '#102330' : 'black',
                                    color: 'white',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    padding: '13px'
                                }}>
                                    <div style={{ display: 'inline-block' }}>
                                        <span>
                                            {getHomeIcon('white')}
                                        </span>
                                        <p className="pl-2" style={{ display: "inline" }}>Home</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/blogs">
                            <div style={{ padding: '10px' }}>
                                <div style={{
                                    backgroundColor: props.source === 'blogs' ? '#102330' : 'black',
                                    color: 'white',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    padding: '13px'
                                }}>
                                    <div style={{ display: 'inline-block' }}>
                                        <span>
                                            {getBlogIcon('white')}
                                        </span>
                                        <p className="pl-2" style={{ display: "inline" }}>Blogs</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Link to="/projects">
                            <div style={{ padding: '10px' }}>
                                <div style={{
                                    backgroundColor: props.source === 'projects' ? '#102330' : 'black',
                                    color: 'white',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    padding: '13px'
                                }}>
                                    <div style={{ display: 'inline-block' }}>
                                        <span>
                                            {getProjectIcon('white')}
                                        </span>
                                        <p className="pl-2" style={{ display: "inline" }}>Projects</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div style={{ padding: '10px' }}>
                            <div style={{
                                backgroundColor: 'black',
                                color: 'white',
                                textAlign: 'center',
                                borderRadius: '10px',
                                padding: '13px'
                            }}>
                                <div style={{ display: 'inline-block' }}>
                                    <span>
                                        {getContactMeIcon('white')}
                                    </span>
                                    <p className="pl-2" style={{ display: "inline" }} onClick={contactMeMobileView}>Contact Me</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </React.Fragment>
        )
    }
}

export default Navbar;