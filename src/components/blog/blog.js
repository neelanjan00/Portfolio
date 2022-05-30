import { useEffect, useState }from 'react';
import Footer from '../footer/footer';
import Navbar from '../navbar/navbar';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';

import styles from './blog.module.css';

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
}

const getLoadingSpinner = () => {
    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <div class="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
            <span class="sr-only" />
        </div>
    </div>
}

function Blog() {

    const { id } = useParams();
    const [blogMetadata, setBlogMetadata] = useState({});
    const [blogContent, setBlogContent] = useState("");

    useEffect(() => {
        db.collection("blogs")
            .where("dateTime", "==", parseInt(id))
            .get()
            .then(snap => setBlogMetadata(snap.docs[0].data()))
            .catch(err => alert(err))
    }, [id]);

    useEffect(() => {
        if(blogMetadata.markdownURL) {
            fetch(blogMetadata.markdownURL)
            .then(response => response.text())
            .then(newBlogContent => {
                setBlogContent(newBlogContent)
            })
        }
    }, [blogMetadata])

    return (
        <div>
            <Navbar />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>
            <div className='container'>
                <h5>{blogMetadata.dateTime ? getDateFromDateTime(blogMetadata.dateTime) : ""}</h5>
                <h1 style={{ fontWeight: 700 }} className='pb-5'>{blogMetadata.title}</h1>
                {blogMetadata.coverImageURL ? <img src={blogMetadata.coverImageURL} alt="blog cover" className='pb-5' /> : getLoadingSpinner()}
                <div style={{ 
                    paddingLeft: window.screen.width >= 1280 ? '170px' : '0px', 
                    paddingRight: window.screen.width >= 1280 ? '170px' : '0px',  
                    }} className={styles.blogPage}>
                    <ReactMarkdown children={blogContent} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
