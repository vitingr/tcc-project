import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const Popup = ({children, title, subtitle, handleClick}) => {
	return (
    <div className='glassmorphism'>
      <div className='center-glassmorphism center'>
        <div className='add-profile-container'>
          <div className='top-add-profile-container'>
            <h2>{title}</h2>
            <IoCloseSharp size={15} className='icon-cursor' onClick={() => handleClick(false)} />
          </div>
          <p className='add-subtitle'>{subtitle}</p>
          <div className='add-profile-main'>
						{children}
          </div>
        </div>
      </div>
    </div>
	)
}

export default Popup