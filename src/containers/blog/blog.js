import { useEffect, useState }from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {materialDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styles from './blog.module.css';

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
}

const getLoadingSpinner = () => {
    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="sr-only" />
        </div>
    </div>
}

const CodeBlock = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter
                style={materialDark}
                language={match[1]}
                PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

function Blog() {

    const { id } = useParams();
    const [blogMetadata, setBlogMetadata] = useState({});
    const [blogContent, setBlogContent] = useState("");

    useEffect(() => {
        db.collection("blogs")
            .doc(id)
            .get()
            .then(snap => setBlogMetadata(snap.data()))
            .catch(err => alert(err))
    }, [id]);

    useEffect(() => {
        if(blogMetadata.markdownURL) {
            fetch(blogMetadata.markdownURL, {
                method: "GET",
                headers: {
                    "access-control-allow-origin" : "*",
                    "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
                }
            })
            .then(response => response.text())
            .then(newBlogContent => {
                setBlogContent(newBlogContent)
            })
        }
    }, [blogMetadata])

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h5>{blogMetadata.dateTime ? getDateFromDateTime(blogMetadata.dateTime) : ""}</h5>
                <h1 style={{ fontWeight: 700 }} className='pb-5'>{blogMetadata.title}</h1>
                {blogMetadata.coverImageURL ? <img src={blogMetadata.coverImageURL} alt="blog cover" className='pb-5' /> : getLoadingSpinner()}
                <div style={{ 
                    paddingLeft: window.screen.width >= 1280 ? '170px' : '0px', 
                    paddingRight: window.screen.width >= 1280 ? '170px' : '0px',  
                    }} className={styles.blogPage}>
                    <ReactMarkdown children={blogContent} remarkPlugins={[remarkGfm]} components={CodeBlock} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
