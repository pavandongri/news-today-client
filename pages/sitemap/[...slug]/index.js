import React from 'react';
const baseUrl = process.env.NEXT_PUBLIC_API_URL

function SiteMap({ sitemap }) {
    return <>{sitemap}</>;
}

export async function getServerSideProps({ res, query }) {

    const months = {
        "january": 1,
        "february": 2,
        "march": 3,
        "april": 4,
        "may": 5,
        "june": 6,
        "july": 7,
        "august": 8,
        "september": 9,
        "october": 10,
        "november": 11,
        "december": 12
    };

    const year = Number(query?.slug?.[0])
    const month = Number(months[query?.slug?.[1]?.split('.xml')?.[0]])

    if (isNaN(year) || isNaN(month)) {
        res.writeHead(302, { Location: '/not-found' });
        res.end();
        return { props: {} };
    }

    try {
        const response = await fetch(`${baseUrl}/sitemap/old-stories?year=${year}&month=${month}`);
        const sitemap = await response.text();

        res.setHeader('Content-Type', 'text/xml');
        res.write(sitemap);
        res.end();

        return { props: {} };
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return { props: { sitemap: '' } };
    }
}

export default SiteMap;