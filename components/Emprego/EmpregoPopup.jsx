import React from 'react'
import {IoPeopleSharp, IoListOutline, IoBriefcase, IoBusinessOutline} from 'react-icons/io5'

const EmpregoPopup = () => {
  return (
    <div className='emprego-popup-container'>
      <h1>
        Desenvolvedor de Software - Remote Work USA
      </h1>
      <h2>
        Google SA. - Santa Bárbara d'Oeste (Remoto) - 360 candidatas
      </h2>

      <div className='emprego-stats'>
        <div className='emprego-stat'>
          <IoBriefcase size={16} />
          <p>Emprego Remoto</p>
        </div>

        <div className='emprego-stat'>
          <IoPeopleSharp size={16} />
          <p>+10.000 colaboradas</p>
        </div>

        <div className='emprego-stat'>
          <IoBusinessOutline size={16} />
          <p>Santa Bárbara d'Oeste, SP - Brasil</p>
        </div>

        <div className='emprego-stat'>
          <IoListOutline size={16} />
          <p>Requisitos: Next.JS, Javascript, Html, CSS, React, MongoDB, Express, Nodejs</p>
        </div>
      </div>

      <div className='main-info-emprego'>
        <h2>Sobre a Vaga</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae numquam beatae tenetur, sequi libero nam mollitia incidunt impedit illum at nemo eligendi aperiam saepe neque quidem distinctio consequuntur nobis porro.</p>
      </div>

    </div>
  )
}

export default EmpregoPopup