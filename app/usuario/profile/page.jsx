"use client"

// Imports React
import React from 'react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// Imports Components
import Sidebar from '@components/Sidebar/Sidebar'
import Profile from '@components/Profile/Profile'
import AddCertificado from '@components/Profile/AddCertificado'
import AddExperience from '@components/Profile/AddExperience'
import Loader from '@components/Loader'

const page = () => {

  const { data: session } = useSession()
  const [data, setData] = useState([])
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [showAddCertificado, setShowAddCertificado] = useState(false)

  const getUser = async () => {
    const response = await fetch(`/api/user/${session?.user.id}`)
    const answer = await response.json()
    setData(answer)
  }

  useEffect(() => {
    if (session) {
      getUser()
    }
  }, [session])

  return session ? (
    <div className='profile-main-container'>
      <Profile data={data} showAddExperience={setShowAddExperience} showAddCertificado={setShowAddCertificado} />
      <Sidebar data={data} />
      {showAddExperience ? (
        <AddExperience data={data} handleClick={setShowAddExperience} />
      ) : (
        <div className='display-none'></div>
      )}
      {showAddCertificado ? (
        <AddCertificado data={data} handleClick={setShowAddCertificado} />
      ) : (
        <div className='display-none'></div>
      )}

    </div>
  ) : (
    <Loader />
  )
}

export default page