import React from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL

function SiteMap({ sitemap }) {
    return <>{sitemap}</>;
}

export async function getServerSideProps({ res, query }) {
    const category = query?.name?.split('.xml')?.[0]

    try {
        let sitemap = ""

        if (category) {
            const response = await fetch(`${API_URL}/sitemap/category-sitemap/${category}`);
            sitemap = await response.text();
        }

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