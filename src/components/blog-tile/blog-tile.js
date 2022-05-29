import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const truncateText = (text, start, len) => {
    return text.length > len ? text.slice(start, len) + "..." : text;
}

const getDateFromDateTime = dateTime => {
    const dateTimeString = new Date(dateTime).toString()
    const dateTimeStringArray = dateTimeString.split(" ")

    return `${dateTimeStringArray[1]} ${dateTimeStringArray[2]}, ${dateTimeStringArray[3]}`
}

const BlogTile = (props) => {
    const { title, dateTime, coverImageURL, contentPreview } = props.blogData;

    return (
        <div className="container mt-5">
            <Link to={`/blog/${dateTime}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="row">
                    <div className="col-lg-5 col-12">
                        <img src={coverImageURL} className="img-fluid" style={{objectFit: 'cover'}} alt={title} />
                    </div>
                    <div className="col-lg-7 col-12">
                        <h3 style={{fontWeight: '600', marginTop: window.screen.width > 1280 ? '0' : '10px'}}>{title}</h3>
                        <p>{truncateText(contentPreview, 0, 350)}</p>
                        <h5>{getDateFromDateTime(dateTime)}</h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogTile;