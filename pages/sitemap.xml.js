import React from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL

function SiteMap({ sitemap }) {
    return <>{sitemap}</>;
}

export async function getServerSideProps({ res }) {
    try {
        const response = await fetch(`${API_URL}/sitemap/index-sitemap`);
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