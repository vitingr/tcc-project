"use client"

// Imports React
import { infoUser } from '@utils/userContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Imports Components
import MainCompany from '@components/Company/MainCompany'

const page = () => {

  const router = useRouter()
  const {data} = infoUser()

  useEffect(() => {
    if (data) {
      if (data.tipoConta == "instituicao" || data.tipoConta == "empresa") {
        console.log("Conta Empresarial")
      } else {
        router.push("/empresa/create")
      }
    } 
  }, [data])

  return (
    <div className='company-container'>
      <MainCompany />
    </div>
  )
}

export default page