"use client"

import { infoUser } from '@utils/userContext'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter()
  const {data} = infoUser()

  useEffect(() => {
    if (data) {
      if (data.tipoConta == "empresarial") {
        console.log("Conta Empresarial")
      } else {
        router.push("/empresa/create")
      }
    } 
  }, [data])

  return (
    <div className='company-container'>

    </div>
  )
}

export default page