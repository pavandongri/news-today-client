import React, { useEffect, useState } from 'react'
import Card from './Card'
import Heading from './Heading'
const apiUrl = process.env.NEXT_PUBLIC_API_URL

const Section = ({ categoryName = '', page = 1, pageSize = 5 }) => {
    const [stories, setStories] = useState(null)

    useEffect(() => {
        const getData = async () => {
            if (categoryName) {
                const response = await fetch(`${apiUrl}/stories?category=${categoryName}&page=${page}&pageSize=${pageSize}`)
                const responseData = await response?.json()
                setStories(responseData?.stories)
            }
        }
        getData()
    }, [])


    return (
        stories?.length > 0 ?
            <div className='section-container'>
                <div>
                    <Heading title={categoryName} viewMore={true} />
                </div>

                <div className='section-content'>
                    {
                        stories && stories?.map(story => (
                            <>
                                <Card className='section-item' story={story} />
                            </>
                        ))
                    }
                </div>
            </div>
            :
            null
    )
}

export default Section