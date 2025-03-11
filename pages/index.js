import { apiConstants, getApi } from '@/Utilities/ApiServices'
import Footer from '@/pages/components/Footer'
import Header from '@/pages/components/Header'
import Section from '@/pages/components/Section'
import React, { useEffect, useState } from 'react'

const index = () => {
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    const response = await getApi({ url: apiConstants.listCategories })
    setCategories(response)
  }

  useEffect(() => {
    fetchCategories();
    document.title = 'Putty'
  }, [])

  return (
    <>
      <Header />

      <Section />

      <div className='news-div'>
        {
          categories?.length > 0 && categories?.map(category => (
            <>
              {category?.name?.trim() !== '' && <Section categoryName={category?.name} />}
            </>
          ))
        }
      </div>

      <Footer/>
    </>

  )
}

export default index