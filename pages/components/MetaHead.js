import { getBreadCrumbJsonLD, getGACode, getJsonLD, localSchema } from '@/Utilities/HelperFunctions'
import globalConstants from '@/Utilities/globalConstants'
import Head from 'next/head'
import React from 'react'

const metaData = globalConstants.metaData

const MetaHead = ({ story = {} }) => {
    return (
        <div>
            <Head>
                <title>{story?.title || globalConstants.title}</title>

                <meta name="title" content={story?.title || metaData?.title} />
                <meta name="description" content={story?.description || metaData?.description} />
                <meta name='keywords' content={story?.keywords || metaData?.keywords} />
                <link rel="canonical" href={story?.slug ? globalConstants.domainUrl + '/' + story?.slug : globalConstants.domainUrl} />
                <meta name="publisher" content={metaData?.publisher} />
                <meta name="author" content={metaData?.author} />
                <meta name="lang" content={metaData?.lang} />
                <meta name="robots" content={metaData?.robots} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={story?.title || metaData?.title} />
                <meta property="og:description" content={story?.description || metaData?.description} />
                <meta property="og:url" content={story?.slug ? globalConstants.domainUrl + '/' + story?.slug : globalConstants.domainUrl} />
                <meta property="og:image" content={metaData?.publisherLogo} />
                <meta property="og:image:alt" content={metaData?.publisher} />
                <meta property="og:image:secure_url" content={metaData?.publisherLogo} />
                <meta property="og:image:width" content="527" />
                <meta property="og:image:height" content="351" />
                <meta property="og:site_name" content={story?.slug ? globalConstants.domainUrl + '/' + story?.slug : globalConstants.domainUrl} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={story?.slug ? globalConstants.domainUrl + '/' + story?.slug : globalConstants.domainUrl} />
                <meta name="twitter:title" content={story?.title || metaData?.title} />
                <meta name="twitter:description" content={story?.description || metaData?.description} />
                <meta name="twitter:image" content={metaData?.publisherLogo} />
                <meta name="twitter:image:alt" content={story?.slug ? globalConstants.domainUrl + '/' + story?.slug : globalConstants.domainUrl} />

                {
                    story?.title &&
                    <script defer type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLD(story)) }} />
                }

                {
                    story?.title &&
                    <script defer type='application/ld+json' id='b-jsonLD' dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadCrumbJsonLD(story)) }} />
                }

                <script defer type='application/ld+json' id='localSchema' dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema()) }} />

                {getGACode()}
            </Head>
        </div>
    )
}

export default MetaHead