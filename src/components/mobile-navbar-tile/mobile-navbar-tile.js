import React from 'react';
import { HashLink } from 'react-router-hash-link';

const MobileNavbarTile = props => {

    const { icon, clickHandler, label, highlightNavigation, route, displaySidebar } = props

    return (
        <div style={{ margin: '10px' }}>
            <HashLink to={route ? route : "#"}>
                <div style={{
                    color: 'white',
                    padding: '13px',
                    fontSize: '20px',
                    backgroundColor: highlightNavigation ? '#242424' : 'inherit',
                    borderRadius: '7px',
                    display: displaySidebar ? 'block' : 'none',
                    minWidth: '200px'
                }} onClick={clickHandler ? clickHandler : null}>
                    <div style={{ display: 'inline-block' }}>
                        <span style={{display: 'inline'}} className='ml-4 mr-2'>{icon}</span>
                        <p className="ml-2" style={{ display: "inline" }}>{label}</p>
                    </div>
                </div>
            </HashLink>
        </div>
    );
}

export default MobileNavbarTile;
