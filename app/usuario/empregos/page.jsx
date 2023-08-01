import React from 'react'
import EmpregosList from '@components/Emprego/EmpregosList'
import EmpregoPopup from '@components/Emprego/EmpregoPopup'

const page = () => {
  return (
    <div className='empregos-container'>
      <EmpregosList />
      <EmpregoPopup />
    </div>
  )
}

export default page