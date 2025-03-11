import { apiConstants, getApi } from '@/Utilities/ApiServices'
import Card from '@/pages/components/Card'
import Header from '@/pages/components/Header'
import Heading from '@/pages/components/Heading'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'

const index = () => {
    const [stories, setStories] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(20)
    const [totalPages, setTotalPages] = useState(1)

    const category = useParams()?.category

    const fetchStories = async () => {
        const url = `${apiConstants.listStories}?category=${category}&page=${currentPage}&pageSize=${pageSize}`
        const data = await getApi({ url })
        setStories(data?.stories)

        setTotalPages(data?.totalPages)
    }

    useEffect(() => {
        if (currentPage && category) fetchStories()
    }, [currentPage, category])

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== '...')
            setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Header />

            <div className='news-div'>
                {
                    stories?.length > 0 ?
                        <div className='section-container'>
                            <div>
                                <Heading title={category} viewMore={false} />
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
                }

                {
                    totalPages > 1 &&
                    <div className='pagination-container'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                }

            </div>
        </div>

    )
}

export default index