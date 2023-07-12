import React from 'react'

// Imports React
import { IoAlertCircleOutline } from 'react-icons/io5'

const FriendsSidebar = () => {
  return (
    <div className='menu-sidebar-container'>
      <div className='top-sidebar'>
        <h3>
          Encontrar Amigos
        </h3>
        <IoAlertCircleOutline size={17.5} className='icon-cursor' />
      </div>
      <div className='main-friend-sidebar'>
        <div className='friends-sidebar center'>
          <button className="cta icon-cursor">
            <span>Ver mais</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FriendsSidebar