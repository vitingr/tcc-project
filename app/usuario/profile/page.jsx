"use client"

// Imports React
import React from 'react'
import { useEffect, useState } from 'react'

// Imports Components
import Sidebar from '@components/Sidebar/Sidebar'
import Profile from '@components/Profile/Profile'
import AddCertificado from '@components/Profile/AddCertificado'
import AddExperience from '@components/Profile/AddExperience'
import EditProfile from '@components/Profile/EditProfile'
import Loader from '@components/Loader'
import { infoUser } from '@utils/userContext'

const page = () => {

  const { data } = infoUser()
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [showAddCertificado, setShowAddCertificado] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  return data ? (
    <div className='profile-main-container'>
      <Profile data={data} showAddExperience={setShowAddExperience} showAddCertificado={setShowAddCertificado} showEditProfile={setShowEditProfile} />
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
      {showEditProfile ? (
        <EditProfile data={data} handleClick={setShowEditProfile} />
      ) : (
        <div> </div>
      )}

    </div>
  ) : (
    <Loader />
  )
}

export default page