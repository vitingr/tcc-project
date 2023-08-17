import React from 'react'

const Theme = ({ image, title, color1, color2, color3, color4, color5, handleClick, tema}) => {
  return (
    <div className='theme-option' onClick={() => handleClick(`${tema}`)}>
        <div className='theme-photo-container'>
            <img src={image} alt="background" className='theme-image' />
        </div>
        <div className='theme-info'>
            <h2>{title}</h2>
            <div className='pallete-flex'>
            <div className='color-pallete-theme' style={{background: color1}}></div>
            <div className='color-pallete-theme' style={{background: color2}}></div>
            <div className='color-pallete-theme' style={{background: color3}}></div>
            <div className='color-pallete-theme' style={{background: color4}}></div>
            <div className='color-pallete-theme' style={{background: color5}}></div>
            </div>
        </div>
    </div>
  )
}

export default Theme