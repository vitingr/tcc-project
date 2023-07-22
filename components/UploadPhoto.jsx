"use client"

import React, { useState } from 'react'

const UploadPhoto = () => {

  const [file, setFile] = useState()

  const handleChange = async (e) => {
    setFile(e.target.files[0])

    const formData = new FormData()
    formData.append('file', file)
   
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        console.log(response.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='uploadPhoto-container'>
      <input type="file" onChange={(e) => handleChange(e)} />
    </div>
  )
}

export default UploadPhoto