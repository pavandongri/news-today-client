import React, { useEffect, useState } from 'react'
import Card from './Card'
import Heading from './Heading'
import { getApi } from '@/Utilities/ApiServices'
import Loader from './Loader'

const Section = ({ categoryName = '', page = 1, pageSize = 5 }) => {
    const [stories, setStories] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            if (categoryName) {
                setIsLoading(true)
                const url = `/stories?category=${categoryName}&page=${page}&pageSize=${pageSize}`
                const data = await getApi({ url: url })
                setStories(data?.stories)
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    if (isLoading) {
        return (<div className='pt-10p'>
            <Loader />
        </div>)
    }

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