"use client"

import React, { useState } from 'react'
import { CldUploadButton } from 'next-cloudinary'
import {IoCameraSharp} from 'react-icons/io5'
import axios from 'axios'

const UploadPhoto = () => {

  const [file, setFile] = useState()

  const handleUpload = async (e) => {
    
    console.log(e)
    try {
      axios.post("/api/upload", {
        image: e.info.secure_url 
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='uploadPhoto-container'>
      <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset='m3k11e7o'>
        <IoCameraSharp size={20} />
      </CldUploadButton>
    </div>
  )
}

export default UploadPhoto