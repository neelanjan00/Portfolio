import React from 'react';
import { Helmet } from 'react-helmet';

const BlogHeader = () => {
    return (
        <Helmet>
            <title>Neelanjan Manna</title>
            <meta name="description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." data-react-helmet="true" />
            <meta property="og:title" content="Neelanjan Manna" data-react-helmet="true" />
            <meta property="og:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." data-react-helmet="true" />
            <meta property="og:image" content="%PUBLIC_URL%/portrait.png" data-react-helmet="true" />
            <meta name="twitter:title" content="Neelanjan Manna" data-react-helmet="true" />
            <meta name="twitter:description" content="Neelanjan is an SDE at Harness. He is a cloud-native enthusiast who contributes to the development of the LitmusChaos project." data-react-helmet="true" />
            <meta name="twitter:image" content="%PUBLIC_URL%/portrait.png" data-react-helmet="true" />
        </Helmet>
    );
}

export default BlogHeader;