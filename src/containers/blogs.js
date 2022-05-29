import BlogTile from '../components/blog-tile/blog-tile'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'

import { db } from '../services/firebase'

const Blogs = () => {

    const [blogData, setBlogData] = useState([])

    useEffect(() => {
        db.collection('blogs')
          .orderBy('dateTime', 'desc')
          .onSnapshot(snap => {
            const newBlogData = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setBlogData(newBlogData)
          })
    
        return () => setBlogData({})
    }, [])

    // const rss2json = "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40neelanjanmanna"
    // const [myBlog, setMyBlog] = useState([])

    // useEffect(() => {
    //     fetch(rss2json)
    //         .then(res => res.json())
    //         .then(data => setMyBlog(data))
    //     return setMyBlog([])
    // }, [rss2json]);

    // const displayBlogs = () => {
    //     return myBlog.items && myBlog.items.map(blog => {
    //         return blog.categories.length > 0 && <BlogTile key={blog.pubDate} blogData={blog} />
    //     })
    // }

    return (
        <div>
            <Navbar source="blogs" />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#000000" fillOpacity="1" d="M0,224L720,160L1440,256L1440,0L720,0L0,0Z"></path>
            </svg>

            <h1 style={{ textAlign: 'center', fontWeight: '800' }}>MY BLOGS</h1>
            <div>
                {
                    blogData.map(blog => {
                        return <BlogTile blogData={blog} key={blog.dateTime} />
                    })
                }
            </div>

            <Footer />
        </div>
    )


}

export default Blogs;