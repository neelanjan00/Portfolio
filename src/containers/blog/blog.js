import React from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import ReactMarkdown from 'react-markdown';

import styles from './blog.module.css';

function Blog() {

    const [content, setContent] = React.useState("");

    React.useEffect(() => {
        fetch(`https://raw.githubusercontent.com/litmuschaos/m-agent/master/README.md`)
            .then(async (body) => {
                const data = await body.text();
                setContent(data);
            })
            .catch(err => console.log(err));
    });

    return (
        <div>
            <Navbar />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>
            <div className='container'>
                <h5>Dec 16, 2021</h5>
                <h1 style={{ fontWeight: 700 }} className='pb-5'>Getting Started with LitmusChaos 2.0 in Google Kubernetes Engine</h1>
                <img src='https://miro.medium.com/max/1400/1*jjV-3SHxwdzSamjcI4aEyg.png' alt="blog cover" />
                <div style={{ 
                    paddingLeft: window.screen.width >= 1280 ? '170px' : '0px', 
                    paddingRight: window.screen.width >= 1280 ? '170px' : '0px',  
                    }} className={styles.blogPage}>
                    <ReactMarkdown children={content} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
