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
                <button className='btn btn-outline-dark my-3' style={{width: '300px'}}>Add Blogs</button>
                <button className='btn btn-outline-dark my-3' style={{width: '300px'}}>Add Talk Videos</button>
            </div>

            <Footer />
        </div>
    );
}

export default Admin;