"use client"

import { infoUser } from '@utils/userContext'
import React, { useEffect } from 'react'
import { IoAddSharp, IoOpenOutline } from 'react-icons/io5'

const MainCompany = ({ data }) => {

  return (
    <div className='main-company-container'>
      <div className='bg-company' style={{ backgroundImage: `url(${data.background})` }}></div>
      <div className='main-company-content'>
        <div className='main-company-logo-container'>
          <img src={data.logo} alt="photo-company" className='main-company-logo' />
        </div>
        <div className='main-company-info'>
          <div className='top-company-info'>
            <h1>{data.nome}</h1>
            <p>{data.industria} ● Santa Bárbara d'Oeste, SP ● {data.seguidores} seguidores ● {data.qtdFuncionarios}</p>
          </div>
          <div className='mid-company-info'>
            <div className='about-company'>
              <h3>Sobre a empresa</h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque reprehenderit esse velit repudiandae, ea vitae ratione nobis. Obcaecati quisquam necessitatibus, adipisci quae quasi aspernatur aliquam deleniti minus non natus omnis.
              </p>
            </div>
            <div className='options-company'>
              <div className='option-mid-company color'><IoAddSharp size={16} /> Seguir</div>
              <div className='option-mid-company white'>Visitar Website <IoOpenOutline size={16} /></div>
              <div className='option-mid-company gray'>Mais</div>
            </div>
          </div>
          <div className='bottom-company-info'>
            <div className='company-nav-item'>Home</div>
            <div className='company-nav-item'>Sobre</div>
            <div className='company-nav-item'>Posts</div>
            <div className='company-nav-item'>Vagas</div>
            <div className='company-nav-item'>Seguidores</div>
            <div className='company-nav-item'>Eventos</div>
          </div>
        </div>
      </div>

      <div className='company-feed-container'>
        
      </div>
    </div>
  )
}

export default MainCompany