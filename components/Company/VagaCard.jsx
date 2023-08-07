import React from 'react'
import { IoEllipsisHorizontalSharp, IoPricetagSharp } from 'react-icons/io5'

const VagaCard = ({ info }) => {
  return (
    <div className='vaga-card'>
      <div className='vaga-card-top'>
        <img src={info.foto} alt="logo" className='vaga-card-foto' />
        <IoEllipsisHorizontalSharp size={20} className='icon-cursor' />
      </div>
      <div className='vaga-card-main'>
        <h1>{info.titulo}</h1>
        <h2>{info.nomeEmpresa}</h2>
        <h4>{info.local}</h4>
      </div>
      <div className='vaga-card-bottom'>
        <div className='status-emprego'>
          <IoPricetagSharp size={13} />
          <p>Processo aberto</p>
        </div>
        <div className='vaga-card-time'>
          Publicado 2 dias atrás
        </div>
      </div>
    </div>
  )
}

export default VagaCard