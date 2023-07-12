import React from 'react'

const Experiencia = ({ experiencia }) => {
  return (
    <div className='experiencia-container'>
        <h2>
            {experiencia.cargo} - {experiencia.empresa}
        </h2>
    </div>
  )
}

export default Experiencia