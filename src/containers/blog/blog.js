import { useEffect, useState, useRef }from 'react';
import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {materialDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import useWindowSize from '../../hooks/useWindow';
import rehypeRaw from 'rehype-raw';
import { getLinkedInIcon, getLoadingSpinner } from '../../assets/inline-svgs';
import { getTwitterIcon, getFacebookIcon, getShareLinkIcon } from '../../assets/inline-svgs';

import styles from './blog.module.css';

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
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
    const [topOffset, setTopOffset] = useState(0)
    const [bottomOffset, setBottomOffset] = useState(0)
    const [width] = useWindowSize();

    const [scrollHeight, setScrollHeight] = useState(0)

    useEffect(() => {
        db.collection("blogs")
            .doc(id)
            .get()
            .then(snap => setBlogMetadata(snap.data()))
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

    useEffect(() => {

        function updateScrollheight() {
            setScrollHeight(document.documentElement.scrollTop);
        }

        window.addEventListener('scroll', updateScrollheight)
        updateScrollheight()

        return () => window.removeEventListener('scroll', updateScrollheight)
    }, [])

    const coverImageRef = useRef(null)
    const footerRef = useRef(null)

    useEffect(() => {
        if (blogMetadata.coverImageURL) {
            setTopOffset(coverImageRef.current.offsetHeight)
        }
    }, [blogMetadata.coverImageURL, scrollHeight])

    useEffect(() => {
        if(blogContent !== "") {
            setBottomOffset(footerRef.current.offsetTop)
        }
    }, [blogContent, scrollHeight])

    return (
        <div>
            <Navbar />
            <div style={{
                position: 'sticky', 
                top: '38%', 
                marginLeft: '7%', 
                maxWidth: '100px', 
                display: scrollHeight !== 0 && scrollHeight > topOffset && scrollHeight < bottomOffset-650 && width > 1280 ? 'block' : 'none'}}>
                <div className='py-3'>{getTwitterIcon('black')}</div>
                <div className='py-3'>{getLinkedInIcon('black')}</div>
                <div className='py-3'>{getFacebookIcon('black')}</div>
                <div className='py-3'>{getShareLinkIcon('black')}</div>
            </div>
            <div className='container'>
                <h5>{blogMetadata.dateTime ? getDateFromDateTime(blogMetadata.dateTime) : ""}</h5>
                <h1 style={{ fontWeight: 700 }} className='pb-5'>{blogMetadata.title}</h1>
                {blogMetadata.coverImageURL ? <img src={blogMetadata.coverImageURL} alt="blog cover" ref={coverImageRef} className='pb-5' /> : null}
                <div style={{ 
                    paddingLeft: width >= 1280 ? '170px' : '0px', 
                    paddingRight: width >= 1280 ? '170px' : '0px',  
                    }} className={styles.blogPage}>
                    {blogContent ? <ReactMarkdown children={blogContent} rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={CodeBlock} /> : getLoadingSpinner()}
                </div>
            </div>
            <div ref={footerRef}>
                <Footer />
            </div>
        </div>
    );
}

export default Blog;
