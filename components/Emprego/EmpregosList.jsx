import React from 'react'
import Emprego from './Emprego'

const EmpregosList = () => {
  return (
    <div className='empregos-list-container'>
      <div className='empregos-aplicados'>
        Ver minhas vagas aplicadas
      </div>
      <Emprego />
      <Emprego />
      <Emprego />
      <Emprego />
      <Emprego />
      <Emprego />
      <Emprego />
      <Emprego />
    </div>
  )
}

export default EmpregosList