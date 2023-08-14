"use client"

import React from 'react'

const Certificado = ({ certificado }) => {
  return (
    <div className='certificado-container'>
      <div className='certificado-photo-container'>
        <img src={certificado.foto} alt="photo" className='certificado-photo' />
      </div>
      <div className='certificado-info'>
        <h3>{certificado.nome}</h3>
        <h4>{certificado.unidade}</h4>
        {certificado.mesInicio || certificado.anoInicio || certificado.mesFim || certificado.anoFim ? (
          <p >
            {
              certificado.mesInicio && certificado.anoInicio ? (
                <>
                  {certificado.mesInicio}, {certificado.anoInicio} -
                </>
              ) : (
                <>
                  {certificado.mesInicio} {certificado.anoInicio} -
                </>
              )
            }
            {certificado.mesFim && certificado.anoFim ? (
              <>
                {certificado.mesFim}, {certificado.anoFim}
              </>
            ) : (
              <>
                {certificado.mesFim} {certificado.anoFim}
              </>
            )}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div >
  )
}

export default Certificado