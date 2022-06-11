import React from 'react';
import { Helmet } from 'react-helmet';

const DefaultHeader = props => {
    return (
        <Helmet>
            <title>{props.title}</title>
            <meta name="description" content={props.contentPreview} data-react-helmet="true" />
            <meta property="og:title" content={props.title} data-react-helmet="true" />
            <meta property="og:description" content={props.contentPreview} data-react-helmet="true" />
            <meta property="og:image" content={props.coverImageURL} data-react-helmet="true" />
            <meta name="twitter:title" content={props.title} data-react-helmet="true" />
            <meta name="twitter:description" content={props.contentPreview} data-react-helmet="true" />
            <meta name="twitter:image" content={props.coverImageURL} data-react-helmet="true" />
        </Helmet>
    );
}

export default DefaultHeader;
