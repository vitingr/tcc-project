"use client"

import React, { useState } from 'react'
import EmpregosList from '@components/Emprego/EmpregosList'
import EmpregoPopup from '@components/Emprego/EmpregoPopup'

const page = () => {

  const [empregoInfo, setEmpregoInfo] = useState([])

  return (
    <div className='empregos-container'>
      <EmpregosList setEmpregoInfo={setEmpregoInfo} />
      {empregoInfo.titulo == undefined ? (
        <></>
      ) : (
        <EmpregoPopup info={empregoInfo} />
      )}
    </div>
  )
}

export default page