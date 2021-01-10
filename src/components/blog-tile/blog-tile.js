import React from 'react'

const BlogTile = (props) => {    
    const { title, link, thumbnail, categories, content, pubDate } = props.blogData;

    const cleanTitle = checkTitle => {
        checkTitle = checkTitle.replace("amp;", "");
        return checkTitle
    }

    const truncateText = (text, start, len) => {
        return text.length > len ? text.slice(start, len) : text;
    }

    const convertDate = date => {
        let dateArray = date.slice(0, 10).split("-")
        let year = dateArray.shift();
        dateArray.push(year)
        return `Published: ${dateArray.join("/")}`;
    }

    const identifyParagraphs = content => {
        let rex = /<\s*p[^>]*>([^<]*)<\s*\/\s*p\s*>/
        return rex.exec(content)[0].replace(/<\/?[^>]+(>|$)/g, "")
    }

    const getCategories = categories => {
        let categoryString = "";

        categories.forEach(tags => categoryString += "#" + tags + "\xa0\xa0");

        return categoryString
    }

    return (
        <div className="container mt-5">
            <a target="_blank" rel="noopener noreferrer" href={`${link}`} style={{textDecoration: 'none', color: 'black'}}>
                <div className="row">
                    <div className="col-lg-5 col-12">
                        <img src={`${thumbnail}`} 
                             className="img-fluid"
                             style={{objectFit: 'cover'}} 
                             alt={truncateText(cleanTitle(title), 0, 60)} />
                    </div>
                    <div className="col-lg-7 col-12">
                        <h3 style={{fontWeight: '600'}}>{title}</h3>
                        <div>
                            <h5 style={{textTransform: 'capitalize', fontWeight: '700'}}>{getCategories(categories)}</h5>
                        </div><br />
                        <p>{truncateText(identifyParagraphs(content), 0, 200) + "..."}</p><br />
                        <h5>{convertDate(pubDate)}</h5>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default BlogTile;