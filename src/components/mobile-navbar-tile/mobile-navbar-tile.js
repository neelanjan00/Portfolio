import React from 'react';

const MobileNavbarTile = props => {

    const { icon, clickHandler, label, highlightNavigation } = props

    return (
        <div style={{ margin: '10px' }}>
            <div style={{
                color: 'white',
                padding: '13px',
                fontSize: '20px',
                backgroundColor: highlightNavigation ? '#242424' : 'inherit',
                borderRadius: '7px'
            }} onClick={clickHandler ? clickHandler : null}>
                <div style={{ display: 'inline-block' }}>
                    <span style={{display: 'inline'}} className='ml-4 mr-2'>{icon}</span>
                    <p className="ml-2" style={{ display: "inline" }}>{label}</p>
                </div>
            </div>
        </div>
    );
}

export default MobileNavbarTile;
