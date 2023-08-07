"use client"

// Imports React
import * as React from "react";
import { motion } from "framer-motion";
import { useState } from 'react'

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

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return data ? (
    <div className='profile-main-container'>
      <Profile data={data} showAddExperience={setShowAddExperience} showAddCertificado={setShowAddCertificado} showEditProfile={setShowEditProfile} />
      <Sidebar data={data} />

      {showAddExperience ? (
        <AddExperience data={data} handleClick={setShowAddExperience} />
      ) : (
        <></>
      )}
      {showAddCertificado ? (
        <AddCertificado data={data} handleClick={setShowAddCertificado} />
      ) : (
        <></>
      )}
      {showEditProfile ? (
        <EditProfile data={data} handleClick={setShowEditProfile} />
      ) : (
        <></>
      )}

    </div>
  ) : (
    <Loader />
  )
}

export default page