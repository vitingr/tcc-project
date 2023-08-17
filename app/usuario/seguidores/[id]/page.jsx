"use client"

// Imports React
import { useState } from 'react'
import { usePathname } from 'next/navigation'

// Imports Components
import Sidebar from '@components/Sidebar/Sidebar'
import Profile from '@components/Profile/Profile'
import AddCertificado from '@components/Profile/AddCertificado'
import AddExperience from '@components/Profile/AddExperience'
import AddDescricao from "@components/Profile/AddDescricao";
import EditProfile from '@components/Profile/EditProfile'

// Imports Context
import Loader from '@components/Others/Loader'
import { infoUser } from '@utils/userContext'
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Seguidores from '@components/Seguidores'

const page = () => {

  const { data: session } = useSession()
  const { data } = infoUser()
  const pathname = usePathname().split("/")
  const userId = pathname[3]

  const [content, setContent] = useState([])

  const fetchData = async () => {
    try {
      const result = await fetch(`/api/user/seguidores/${userId}`)
      const response = await result.json()
      setContent(response)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  return session ? (
    <div className='profile-main-container'>
      <Seguidores content={content} />
      <Sidebar data={content} />
    </div>
  ) : (
    <Loader />
  )
}

export default page