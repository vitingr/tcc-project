import React from 'react'
import {IoPricetagSharp} from 'react-icons/io5'

const Emprego = ({ vaga, setEmpregoInfo }) => {
  return (
    <div className='emprego-container' onClick={() => setEmpregoInfo(vaga)}>
      <div className='logo-emprego'>
        <img src={vaga.foto} alt="logo" />
      </div>
      <div className='info-emprego'>
        <h1>{vaga.titulo}</h1>
        <h2>{vaga.cargo}</h2>
        <h6>{vaga.local} ({vaga.tipo})</h6>
        <div className='status-emprego'>
          <IoPricetagSharp size={13} />
          <p>Processo aberto</p>
        </div>
      </div>
    </div>
  )
}

export default Emprego