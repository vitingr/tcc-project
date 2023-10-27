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
import CreatePost from '@components/Company/CreatePost'

const page = () => {

  const router = useRouter()
  const { data } = infoUser()
  const { data: session, status } = useSession()

  const [company, setCompany] = useState([])

  const [isDono, setIsDono] = useState(false)
  const [editCompany, setEditCompany] = useState(false)
  const [createVaga, setCreateVaga] = useState(false)
  const [createPost, setCreatePost] = useState(false)

  const getCompany = async () => {
    if (data) {
      try {
        const answer = await fetch(`/api/company/${data._id}`)
        const response = await answer.json()
        setCompany(response)
        if (data._id === response.dono) {
          setIsDono(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClick = async () => {

  }

  useEffect(() => {
    if (session && status == "authenticated") {
      if (data._id !== undefined) {
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
      <MainCompany content={company} dono={isDono} setCreateVaga={setCreateVaga} setCreatePost={setCreatePost} setEditCompany={setEditCompany} handleClick={handleClick} />
      <Sidebar />
      {createPost ? (<CreatePost handleClick={setCreatePost} companyInfo={company} />) : (<></>)}
      {editCompany ? (<EditCompany content={company} handleClick={setEditCompany} />) : (<></>)}
    </div>
  )
}

export default page