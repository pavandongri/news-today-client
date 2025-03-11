import { apiConstants, getApi } from '@/Utilities/ApiServices'
import Footer from '@/pages/components/Footer'
import Header from '@/pages/components/Header'
import Section from '@/pages/components/Section'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const LazySection = dynamic(() => import('./components/LazySection'));

const index = () => {
  const [categories, setCategories] = useState([
    { name: 'movies' },
    { name: 'beauty' },
    { name: 'health' },
    { name: 'cricket' }
  ])

  const fetchCategories = async () => {
    // const response = await getApi({ url: apiConstants.listCategories })
    // setCategories(response)
  }

  useEffect(() => {
    fetchCategories();
    document.title = 'News Today'
  }, [])

  return (
    <>
      <Header />

      <Section />

      {
        categories?.length > 0 &&
        categories?.map(category => {
          return (
            <div className='news-div' style={{ minHeight: '350px' }}>
              <LazySection categoryName={category?.name} />
            </div>
          )
        })
      }

      <Footer />
    </>

  )
}

export default index