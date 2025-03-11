import React, { useEffect, useState } from 'react'
import Card from './Card'
import Heading from './Heading'
import { getApi } from '@/Utilities/ApiServices'

const Section = ({ categoryName = '', page = 1, pageSize = 5 }) => {
    const [stories, setStories] = useState(null)

    useEffect(() => {
        const getData = async () => {
            if (categoryName) {
                const url = `/stories?category=${categoryName}&page=${page}&pageSize=${pageSize}`
                const data = await getApi({url:url })
                setStories(data?.stories)
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