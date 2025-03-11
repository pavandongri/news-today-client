import { apiConstants, getApi } from '@/Utilities/ApiServices'
import { getFormatedDate } from '@/Utilities/HelperFunctions'
import Header from '@/public/components/Header'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [story, setStory] = useState({})
  const slug = useParams()?.slug

  const fetchStory = async (slug) => {
    const response = await getApi({ url: apiConstants.storyBySlug + '/' + slug })
    setStory(response?.story)
  }

  useEffect(() => {
    if (slug) fetchStory(slug)
  }, [slug])
  return (
    <div>

      <Header />

      <div className='news-div' style={{ marginTop: '2%', padding: '2%' }}>
        <div>
          <h3> {story?.title}</h3>
        </div>

        <div>
          <p>{story?.description}</p>
        </div>

        <div>
          <p className='col-grey f-14'>Posted Date: {getFormatedDate(story?.createadAt)}</p>
        </div>

        <div className='text-center'>
          <img className='w-60 br-10' src={story?.imageUrl} alt='image' />
        </div>

        <div>
          {story?.cards?.map((card, index) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: card }} />
          ))}
        </div>

      </div>


    </div>
  )
}

export default index