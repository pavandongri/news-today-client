const moment = require('moment');
const { default: globalConstants } = require('./globalConstants');

const getFormatedDate = (date) => {
    return moment(date).format('DD-MMMM-YYYY HH:mm');
}

const capitalizeString = (s) => {
    if (!s || typeof s !== "string") return s;
    return s?.[0]?.toUpperCase() + s.slice(1);
}


const getJsonLD = (story = {}) => {
    const jsonLD = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: story?.title,
        image: {
            '@type': 'ImageObject',
            url: story?.imageUrl,
            width: '1200',
            height: '675',
        },
        url: globalConstants?.domainUrl + '/' + story?.slug,
        datePublished: story?.createdAt,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': globalConstants?.domainUrl + '/' + story?.slug,
        },
        publisher: {
            '@type': 'Organization',
            name: globalConstants?.metaData?.title,
            url: globalConstants?.domainUrl,
            logo: {
                '@type': 'ImageObject',
                url: story?.imageUrl,
                width: '600',
                height: '60',
            },
            sameAs: [
                globalConstants?.facebookUrl,
                globalConstants?.twitterUrl,
                globalConstants?.youtubeUrl
            ],
        },
        author: [
            {
                '@type': 'Person',
                givenName: story?.authors?.name,
                name: story?.authors?.name,
                url: globalConstants?.domainUrl + '/' + story?.slug,
            },
        ],
        keywords: globalConstants?.metaData?.keywords,
        thumbnailUrl: globalConstants?.metaData?.publisherLogo,
        articleBody: story?.description,
        dateCreated: story?.createdAt,
        dateModified: story?.updatedAt,
        name: story?.title,
        isAccessibleForFree: true,
        isPartOf: {
            '@type': 'WebPage',
            url: globalConstants?.domainUrl + '/' + story?.slug,
            primaryImageOfPage: {
                '@type': 'ImageObject',
                url: story?.imageUrl,
                width: '1200',
                height: '675',
            },
        },
    };

    return jsonLD
}

const getBreadCrumbJsonLD = (story = {}) => {
    const breadCrumbJsonLD = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": globalConstants.domainUrl },
            { "@type": "ListItem", "position": 2, "name": "News", "item": globalConstants.domainUrl + '/' + story?.slug },
        ]
    }
    return breadCrumbJsonLD
}

const localSchema = () => {
    const localSchemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": globalConstants?.metaData?.title,
        "legalName": globalConstants?.metaData?.title,
        "logo": globalConstants?.metaData?.publisherLogo,
        "url": globalConstants?.domainUrl,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hyderabad",
            "addressLocality": "Hyderabad",
            "addressRegion": "Telangana",
            "postalCode": "500002",
            "addressCountry": "IN"
        },
        "telephone": globalConstants.mobile,
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "telephone": globalConstants?.mobile,
            "email": globalConstants.email
        },
        "sameAs": [
            globalConstants?.facebookUrl,
            globalConstants?.twitterUrl,
            globalConstants?.youtubeUrl,
        ],
    }
    return localSchemaData
}

const getGACode = () => {

    if (!globalConstants.GAcode) return <></>

    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${globalConstants.GAcode}`}></script>
            <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag("js", new Date());

                    gtag('config', '${globalConstants.GAcode}', {
                        page_path: window.location.pathname,
                    });
                `}
            </script>
        </>
    )
}


module.exports = {
    getFormatedDate,
    capitalizeString,
    getJsonLD,
    getBreadCrumbJsonLD,
    localSchema,
    getGACode
}