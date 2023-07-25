"use client"

import { infoUser } from '@utils/userContext'
import React from 'react'

const InfoForm = ({ children, step, setStep }) => {

  const { data } = infoUser()

  console.log(`STEP: ${step}`)

  const avancar = () => {
    if (step == 4) {
      console.log("Step Maximo")
    } else {
      setStep(step + 1)
    }
    console.log(step)
  }

  const voltar = () => {
    if (step == 1) {
      console.log("Step Minimo")
    } else {
      setStep(step - 1)
    }
    console.log(step)
  }

  const terminarCadastro = async () => {
   console.log("baby") 
  }

  return (
    <div className='info-form-container'>
      <div className='info-form-main'>
        <h1>Bem-Vindo {data.nome}</h1>
        <h5>Antes da gente começar, precisamos de algumas informações básicas, vamos lá!</h5>
        <div className='info-form-inputs'>
          <form onSubmit={terminarCadastro}>
            {children}
          </form>
          <div className='info-form-buttons'>
            {step == 1 ? (
              <div> </div>
            ) : (
              <div onClick={voltar}>Voltar</div>
            )}
            {step == 4 ? (
              <div>
                <button type='submit' className='info-form-submit'>
                  Confirmar Informações
                </button>
              </div>
            ) : (
              <div onClick={avancar}>Avançar</div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoForm