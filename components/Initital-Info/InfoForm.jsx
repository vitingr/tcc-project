"use client"

import { infoUser } from '@utils/userContext'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import Loader from '@components/Others/Loader'

const InfoForm = ({ children, step, setStep, handleClick, verify, share, setShare }) => {

  const { data } = infoUser()

  const avancar = () => {
    if (step == 5) {
    } else {
      if (step == 4) {
        const response = verify()
        if (response === true) {
          setStep(step + 1)
        } else {
        }
      } else {
        setStep(step + 1)
      }
    }
  }

  const voltar = () => {
    if (step == 1) {
    } else {
      setStep(step - 1)
    }
  }

  return data ? (
    <div className='info-form-container'>
      <ToastMessage />
      <div className='info-form-main'>
        {step == 5 ? (
          <div>
            <h1>Questionário Finalizado!</h1>
          </div>
        ) : (
          <div>
            <h1>Bem-Vindo {data.nome}</h1>
            <h5>Antes da gente começar, precisamos de algumas informações básicas, vamos lá!</h5>
          </div>
        )}
        <div className='info-form-inputs'>
          <form onSubmit={async (e) => {
            e.preventDefault()
            await handleClick(e)
          }}>
            {children}
            <div className='info-form-buttons'>
              {step == 1 ? (
                <div> </div>
              ) : (
                <div>
                  {step == 5 ? (
                    <div>
                      <button className='info-form-submit type="submit"' onClick={() => setShare(true)}>Compartilhar</button>
                    </div>
                  ) : (
                    <div onClick={() => voltar()} className='action-info-form'>Voltar</div>
                  )}
                </div>
              )}
              {step == 4 ? (
                <button className='info-form-submit' onClick={() => avancar()}>
                  Confirmar Informações
                </button>
              ) : (
                <div>
                  {step == 5 ? (
                    <div>
                      <button className='info-form-submit' type="submit" onClick={() => setShare(false)}>Não Compartilhar</button>
                    </div>
                  ) : (
                    <button>
                      <div onClick={() => avancar()} className='action-info-form'>Avançar</div>
                    </button>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default InfoForm