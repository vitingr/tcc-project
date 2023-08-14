"use client"

// Imports React
import * as React from "react";
import { useState } from 'react'

// Imports Components
import Sidebar from '@components/Sidebar/Sidebar'
import Profile from '@components/Profile/Profile'
import AddCertificado from '@components/Profile/AddCertificado'
import AddExperience from '@components/Profile/AddExperience'
import AddDescricao from "@components/Profile/AddDescricao";
import EditProfile from '@components/Profile/EditProfile'
import Loader from '@components/Loader'
import { infoUser } from '@utils/userContext'
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const page = () => {

  const { data } = infoUser()
  // const {data: session} = useSession()
  // const [content, setContent] = useState([])

  // const fetchData = async () => {
  //   try {
  //     const result = await fetch(`/api/user/${data._id}`)
  //     const response = await result.json()
  //     setContent(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   if (session) {
  //     fetchData()
  //   }
  // }, [session])


  const [showAddDescricao, setShowAddDescricao] = useState(false)
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [showAddCertificado, setShowAddCertificado] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  return data ? (
    <div className='profile-main-container'>
      <Profile content={data} showAddExperience={setShowAddExperience} showAddCertificado={setShowAddCertificado} showEditProfile={setShowEditProfile} showAddDescricao={setShowAddDescricao} />
      <Sidebar data={data} />

      {showAddDescricao ? (
        <AddDescricao data={data} handleClick={setShowAddDescricao} />
      ) : (
        <></>
      )}

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