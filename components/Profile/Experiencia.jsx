import React from 'react'
import { IoEllipseSharp } from 'react-icons/io5'

const Experiencia = ({ experiencia }) => {
  return (
    <div className='experiencia-container'>
      <div className="header-experiencia">
        <div>
          <IoEllipseSharp size={11} className="experiencia-icon" />
        </div>
        <div>
          <h2>
            {experiencia.cargo} - {experiencia.empresa}
          </h2>
        </div>
      </div>

      <div className="main-experiencia">
        <h3>
          {experiencia.mesInicio && experiencia.anoInicio ? (
            <>
              {experiencia.mesInicio}, {experiencia.anoInicio} -
            </>
          ) : (
            <>
              {experiencia.mesInicio} {experiencia.anoInicio} -
            </>
          )}
          {experiencia.mesFim && experiencia.anoFim ? (
            <>
             {experiencia.mesFim}, {experiencia.anoFim} 
            </>
          ) : (
            <>
             {experiencia.mesFim} {experiencia.anoFim} 
            </>
          )}
          
        </h3>

        <h5>
          Santa Bárbara d'Oeste, SP - Brasil
        </h5>

        <p>
          {experiencia.aprendizado}
        </p>

        <h4>
          <span className="bold">Habilidades: </span> teste teste {experiencia.habilidades}
        </h4>
      </div>
    </div>
  )
}

export default Experiencia