// Imports React
import React from 'react'

// Imports Icons
import { IoAlertCircleOutline, IoNewspaper } from 'react-icons/io5'

const NewsSidebar = () => {
  return (
    <div className='menu-sidebar-container'>
      <div className='top-sidebar'>
        <h3>
          Veja as tendências
        </h3>
        <IoAlertCircleOutline size={17.5} className='icon-cursor' />
      </div>
      <div className='sidebar-hot-container'>
        <li>
          <div><IoNewspaper size={18} /></div>
          <p>Mercado de Trabalho</p>
        </li>
        <li>
          <div><IoNewspaper size={18} /></div>
          <p>Processos Seletivos</p>
        </li>
        <li>
          <div><IoNewspaper size={18} /></div>
          <p>Vagas</p>
        </li>
        <li>
          <div><IoNewspaper size={18} /></div>
          <p>Candidaturas</p>
        </li>
      </div>
    </div>
  )
}

export default NewsSidebar