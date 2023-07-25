import React from 'react'
import InfoForm from './InfoForm'

const Finalizacao = ({ step, setStep, handleClick, share, setShare }) => {
  return (
    <div>
      <InfoForm setStep={setStep} step={step} handleClick={handleClick} share={share} setShare={setShare}>
        <div className='finalizar-container'>
          <p>Seu cadastro está 100% completo com as informações agora! você deseja compartilhar isso em sua timeline para mostrar que você está por aí?</p>
        </div>
      </InfoForm>
    </div>
  )
}

export default Finalizacao