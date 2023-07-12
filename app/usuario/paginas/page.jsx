"use client"

import React from 'react'
import FriendActions from '@components/FriendActions'

const page = ({ data }) => {
  return (
    <div className='friends-container'>
      <FriendActions />
      <div className='friends-options-container'>

      </div>
    </div >
  )
}

export default page