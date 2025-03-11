import { getFormatedDate } from '@/Utilities/HelperFunctions';
import globalConstants from '@/Utilities/globalConstants';
import Link from 'next/link'
import React from 'react'

const Card = ({ story = {} }) => {
    const paragraphLength = 70;
    const titleLength = 20;

    const imgSrc = story?.imageUrl || globalConstants.coverImage
    const title = story?.title
    const description = story?.description
    const date = getFormatedDate(story?.createdAt);

    return (
        <div>
            <Link href={'/story-detail/' + story?.slug} target='_blank' style={{ textDecoration: 'none' }}>
                <div className='card' onClick={() => { }}>
                    <img src={imgSrc} alt='img' />
                    <p className='fw-bold h-10'>{title?.toString()?.substring(0, titleLength) + `${title?.length >= titleLength ? '...' : ''}`}</p>
                    <p className='f-14'> {description?.toString()?.substring(0, paragraphLength) + `${description?.length >= paragraphLength ? '...' : ''}`}</p>
                    <p className='date-para'>{date}</p>
                </div>
            </Link>

        </div>
    )
}

export default Card