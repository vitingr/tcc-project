import React from 'react'
import InfoForm from './InfoForm'

const Propostas = ({ step, setStep }) => {
  return (
    <div>
      <InfoForm setStep={setStep} step={step}>
        <div className='propostas-container'>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="sim" /> Sim, estou procurando um novo emprego
          </div>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="talvez" /> Não, mas se a oportunidade certa aparecer, talvez
          </div>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="nao" /> Não tenho interesse
          </div>
        </div>
      </InfoForm>
    </div>
  )
}

export default Propostas