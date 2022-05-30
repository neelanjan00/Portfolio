import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';

const Admin = () => {

    const {url} = useRouteMatch()

    return (
        <div>
            <Navbar />

            <div className='container' style={{display: 'grid', placeItems: 'center'}}>
                <Link to={`${url}/add-projects`}>
                    <button className='btn btn-outline-dark my-3' style={{width: '300px'}}>Add Projects</button>
                </Link>
                <Link to={`${url}/add-talks`}>
                    <button className='btn btn-outline-dark my-3' style={{width: '300px'}}>Add Talk Videos</button>
                </Link>
                <Link to={`${url}/add-blogs`}>
                    <button className='btn btn-outline-dark my-3' style={{width: '300px'}}>Add Blogs</button>
                </Link>
            </div>

            <Footer />
        </div>
    );
}

export default Admin;