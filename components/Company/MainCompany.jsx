"use client"

import { infoUser } from '@utils/userContext'
import React from 'react'

const MainCompany = () => {

  const {companyInfo} = infoUser()
  console.log(companyInfo)

  return (
    <div className='main-company-container'>
      <div className='bg-company'></div>
      <div className='main-company-main'>
        {companyInfo.nome}
        teste
      </div>
    </div>
  )
}

export default MainCompany