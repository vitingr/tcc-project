"use client"

import { CldUploadButton } from 'next-cloudinary';
import {IoImageOutline} from 'react-icons/io5'

const UploadPostPhoto = ({ file, value }) => {

  const handleUpload = async (e) => {
    try {
      file(e.info.secure_url)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset='m3k11e7o' className="bg-transparent">
        <span>
          <IoImageOutline size={18} />
        </span>
      </CldUploadButton>
    </div>
  )
}

export default UploadPostPhoto