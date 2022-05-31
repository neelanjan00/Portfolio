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

    return (
        <div>
            <Navbar />
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