"use client"

import React from 'react'
import Image from 'next/image'

const Certificado = ({certificado}) => {
  return (
    <div className='certificado-container'>
        <div className='certificado-photo-container'>
            <Image src={certificado.foto} width={100} height={100} alt="photo" className='certificado-photo' />
        </div>
        <div className='certificado-info'>
            <h3>{certificado.nome}</h3>
            <p>{certificado.unidade}</p>
        </div>
    </div>
  )
}

export default Certificado