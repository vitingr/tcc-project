import React from 'react'
import InfoForm from './InfoForm'

const Propostas = ({ step, setStep, procurandoEmprego, setProcurandoEmprego, verify }) => {
  return (
    <div>
      <InfoForm setStep={setStep} step={step} verify={verify}>
        <div className='propostas-container'>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="sim" onChange={(e) => setProcurandoEmprego(e.target.value)} /> Sim, estou procurando um novo emprego
          </div>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="talvez" onChange={(e) => setProcurandoEmprego(e.target.value)} /> Não, mas se a oportunidade certa aparecer, talvez
          </div>
          <div className='proposta-item'>
            <input type="radio" name="emprego" id="emprego" value="nao" onChange={(e) => setProcurandoEmprego(e.target.value)} /> Não tenho interesse
          </div>
        </div>
      </InfoForm>
    </div>
  )
}

export default Propostas