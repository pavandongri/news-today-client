import { apiConstants, getApi } from '@/Utilities/ApiServices'
import Flirt from '@/public/components/Flirt'
import Footer from '@/public/components/Footer'
import Header from '@/public/components/Header'
import Section from '@/public/components/Section'
import React, { useEffect, useState } from 'react'
const apiUrl = process.env.apiBaseUrl || 'http://localhost:3009'

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