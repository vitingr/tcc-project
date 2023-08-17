// "use client"

// import React, { useState } from 'react'
// import { CldUploadButton } from 'next-cloudinary'
// import {IoCameraSharp} from 'react-icons/io5'
// import axios from 'axios'

// const UploadPhoto = ({ file, value }) => {

//   const handleUpload = async (e) => {

//     try {
//        axios.post("/api/upload", {
//         image: e.info.secure_url 
//       })

//       file(e.info.secure_url)


//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className='uploadPhoto-container'>
//       <CldUploadButton options={{maxFiles: 1}} onUpload={handleUpload} uploadPreset='m3k11e7o'>
//         <div className='select-photo-cloudinary'>
//           Selecionar Foto
//         </div>
//       </CldUploadButton>
//     </div>
//   )
// }

// export default UploadPhoto

"use client"

import { CldUploadButton } from 'next-cloudinary';

const UploadPhoto = ({ file, value }) => {

  const handleUpload = async (e) => {
    try {
      file(e.info.secure_url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='uploadPhoto-container'>
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='m3k11e7o'>
        <div className='select-photo-cloudinary'>
          Selecionar Foto
        </div>
      </CldUploadButton>
    </div>
  )
}

export default UploadPhoto