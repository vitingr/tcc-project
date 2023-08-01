import React from 'react'
import {IoPricetagSharp} from 'react-icons/io5'

const Emprego = () => {
  return (
    <div className='emprego-container'>
      <div className='logo-emprego'>
        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png" alt="logo" />
      </div>
      <div className='info-emprego'>
        <h1>Desenvolvedor de Software - Remote Work USA</h1>
        <h2>Google SA.</h2>
        <h6>Santa Bárbara d'Oeste (Remote)</h6>
        <div className='status-emprego'>
          <IoPricetagSharp size={13} />
          <p>Processo aberto</p>
        </div>
      </div>
    </div>
  )
}

export default Emprego