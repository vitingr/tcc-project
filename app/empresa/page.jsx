"use client"

// Imports React
import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Imports Components
import MainCompany from '@components/Company/MainCompany'
import Sidebar from '@components/Sidebar/Sidebar'
import CreateVaga from '@components/Company/CreateVaga'
import { useSession } from 'next-auth/react'
import EditCompany from '@components/Company/EditCompany'

const page = () => {

  const router = useRouter()
  const { data } = infoUser()
  const { data: session } = useSession()

  const [company, setCompany] = useState([])
  const [isDono, setIsDono] = useState(false)
  const [editCompany, setEditCompany] = useState(false)
  const [createVaga, setCreateVaga] = useState(false)

  const getCompany = async () => {
    try {
      if (data) {
        const answer = await fetch(`/api/company/${data._id}`)
        const response = await answer.json()
        setCompany(response)
        if (data._id === response.dono) {
          setIsDono(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session) {
      if (data) {
        if (data.tipoConta == "instituicao" || data.tipoConta == "empresa") {
          getCompany()
        } else {
          router.push("/empresa/create")
        }
      }
    }
  }, [session, data])

  return (
    <div className='company-container'>
      <MainCompany content={company} dono={isDono} setCreateVaga={setCreateVaga} setEditCompany={setEditCompany} />
      <Sidebar />
      {createVaga ? (
        <CreateVaga handleClick={setCreateVaga} />
      ) : (
        <></>
      )}
      {editCompany ? (
        <EditCompany content={company} handleClick={setEditCompany} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default page