import React from 'react';

import Content from '../blogs/blog.mdx'
import Footer from '../components/footer/footer';
import Navbar from '../components/navbar/navbar';

const Blog = () => {
    return (
        <div>
            <Navbar />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>
            <div className='container'>
                <h1 style={{textAlign: 'center', fontWeight: 700}} className='pb-5'>
                    Getting Started with LitmusChaos 2.0 in Google Kubernetes Engine
                </h1>
                <div style={{paddingLeft: '170px', paddingRight: '170px', lineHeight: 1.7, fontSize: 'x-large'}}>
                    <Content />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
