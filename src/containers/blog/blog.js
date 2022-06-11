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
import { getTwitterIcon, getFacebookIcon, getRedditIcon } from '../../assets/inline-svgs';

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
                top: '37%', 
                marginLeft: '7%', 
                width: 'fit-content', 
                display: scrollHeight !== 0 && scrollHeight > topOffset && scrollHeight < bottomOffset-1090 && width > 1280 ? 'block' : 'none'}}>
                <div className='my-5' role='button'>
                    <a href={'https://twitter.com/intent/tweet?text='+blogMetadata.title+' by @NeelanjanManna&url='+window.location.href} rel="noreferrer" target='_blank'>
                        {getTwitterIcon('black')}
                    </a>
                </div>
                <div className='my-5' role='button'>
                    <a href={'https://www.linkedin.com/sharing/share-offsite/?url='+window.location.href} rel="noreferrer" target='_blank'>
                        {getLinkedInIcon('black')}
                    </a>
                </div>
                <div className='my-5' role='button'>
                    <a href={'https://www.facebook.com/sharer/sharer.php?u='+window.location.href} rel="noreferrer" target='_blank'>
                        {getFacebookIcon('black')}
                    </a>
                </div>
                <div className='my-5' role='button'>
                    <a href={'https://www.reddit.com/submit?url='+window.location.href+'&title='+blogMetadata.title} rel="noreferrer" target='_blank'>
                        {getRedditIcon('black')}
                    </a>
                </div>
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
                <div className='mt-5' style={{display: blogContent ? 'block' : 'none'}}>
                    <h4 className='py-4'>Share this post:</h4>
                    <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                        <a href={'https://twitter.com/intent/tweet?text='+blogMetadata.title+' by @NeelanjanManna&url='+window.location.href} rel="noreferrer" target='_blank'>
                            {getTwitterIcon('black')}
                        </a>
                    </span>
                    <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                        <a href={'https://www.linkedin.com/sharing/share-offsite/?url='+window.location.href} rel="noreferrer" target='_blank'>
                            {getLinkedInIcon('black')}
                        </a>
                    </span>
                    <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                        <a href={'https://www.facebook.com/sharer/sharer.php?u='+window.location.href} rel="noreferrer" target='_blank'>
                            {getFacebookIcon('black')}
                        </a>
                    </span>
                    <span className='mx-2 mx-sm-4 mx-lg-5' role='button'>
                        <a href={'https://www.reddit.com/submit?url='+window.location.href+'&title='+blogMetadata.title} rel="noreferrer" target='_blank'>
                            {getRedditIcon('black')}
                        </a>
                    </span>
                </div>
            </div>
            <div ref={footerRef}>
                <Footer />
            </div>
        </div>
    );
}

export default Blog;
