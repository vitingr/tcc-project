import React from 'react'
import { IoPeopleSharp, IoListOutline, IoBriefcase, IoBusinessOutline, IoCashSharp } from 'react-icons/io5'
import HtmlContent from '@components/Others/HtmlContent'

const EmpregoPopup = ({ info }) => {
  
  const descricao = info.descricao

  return (
    <div className='emprego-popup-container'>
      <h1>
        {info.titulo}
      </h1>
      <h2>
        {info.nomeEmpresa}- {info.local} {info.tipo} - 0 candidatas
      </h2>

      <div className='emprego-stats'>
        <div className='emprego-stat'>
          <IoBriefcase size={16} />
          <p>Emprego {info.tipo}</p>
        </div>

        <div className='emprego-stat'>
          <IoPeopleSharp size={16} />
          <p>+10.000 colaboradoras</p>
        </div>

        <div className='emprego-stat'>
          <IoBusinessOutline size={16} />
          <p>{info.local} - Brasil</p>
        </div>

        <div className='emprego-stat'>
          <IoListOutline size={16} />
          <p>Requisitos: {info.requisitos}</p>
        </div>
      </div>

      <div className='emprego-stat'>
        <IoCashSharp size={16} />
        <p>Salário: R${info.salario},00</p>
      </div>

      <div className='main-info-emprego'>
        <h2>Sobre a Vaga</h2>
        <p><HtmlContent html={descricao} /></p>
      </div>

      <div>
        <button className='section-button center'>
          Aplicar-se
        </button>
      </div>

    </div>
  )
}

export default EmpregoPopup