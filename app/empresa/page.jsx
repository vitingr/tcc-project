"use client"

// Imports React
import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Imports Components
import MainCompany from '@components/Company/MainCompany'
import Sidebar from '@components/Sidebar/Sidebar'

const page = () => {

  const router = useRouter()
  const {data} = infoUser()

  const [company, setCompany] = useState([])

  const getCompany = async () => {
    try {
      const answer = await fetch(`/api/company/${data._id}`)
      const response = await answer.json()
      setCompany(response)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (data) {
      if (data.tipoConta == "instituicao" || data.tipoConta == "empresa") {
        getCompany()
      } else {
        router.push("/empresa/create")
      }
    } 
  }, [data])

  return (
    <div className='company-container'>
      <MainCompany data={company} />
      <Sidebar />
    </div>
  )
}

export default page