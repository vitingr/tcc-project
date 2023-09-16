"use client"

// Imports React
import { useState } from 'react'
import { usePathname } from 'next/navigation'

// Imports Components
import Sidebar from '@components/Sidebar/Sidebar'
import Profile from '@components/Profile/Profile'

// Imports Context
import Loader from '@components/Others/Loader'
import { infoUser } from '@utils/userContext'
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const page = () => {

  const { data: session } = useSession()
  const { data } = infoUser()
  const pathname = usePathname().split("/")
  const userId = pathname[3]
  const [endereco, setEndereco] = useState([])

  const [content, setContent] = useState([])

  const fetchData = async () => {
    try {
      const result1 = await fetch(`/api/user/${userId}`)
      const response1 = await result1.json()
      setContent(response1)

      const result2 = await fetch(`/api/endereco/${userId}`)
      const response2 = await result2.json()
      setEndereco(response2)

      const profile_visualization = await fetch("/api/user/seeProfile", {
        method: "POST",
        body: JSON.stringify({
          myUser: data._id,
          userId: userId
        })
      })

      if (profile_visualization.ok) {
        return
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (session && data._id !== undefined) {
      fetchData()
    }
  }, [session, data])

  return session ? (
    <div className='profile-main-container'>
      <Profile content={content} endereco={endereco} />
      <Sidebar data={content} />
    </div>
  ) : (
    <Loader />
  )
}

export default page