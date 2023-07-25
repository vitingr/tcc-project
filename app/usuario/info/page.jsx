"use client"

// Imports React
import React, { useState } from 'react'

// Imports Components
import Cargo from '@components/Initital-Info/Cargo'
import Endereco from '@components/Initital-Info/Endereco'
import Finalizacao from '@components/Initital-Info/Finalizacao'
import Propostas from '@components/Initital-Info/Propostas'
import TipoEmprego from '@components/Initital-Info/TipoEmprego'

const AditionalInfoContainer = () => {

  const [step, setStep] = useState(1)

  return (
    <div className='aditionalinfo-container'>
      {step === 1 ? (
        <Endereco setStep={setStep} step={step} />
      ) : (
        <div> </div>
      )}

      {step === 2 ? (
        <TipoEmprego setStep={setStep} step={step} />
      ) : (
        <div> </div>
      )}

      {step === 3 ? (
        <Cargo setStep={setStep} step={step} />
      ) : (
        <div> </div>
      )}

      {step === 4 ? (
        <Propostas setStep={setStep} step={step} />
      ) : (
        <div> </div>
      )}

      {step === 5 ? (
        <Finalizacao setStep={setStep} step={step} />
      ) : (
        <div> </div>
      )}
    </div>
  )
}

export default AditionalInfoContainer