import React from 'react'
import InfoForm from './InfoForm'

const TipoEmprego = ({ step, setStep }) => {
  return (
    <div>
      <InfoForm setStep={setStep} step={step}>
        <div className='info-form-input'>
          <h3>Sua Área <span className='pink-span'>*</span></h3>
          <input type="text" name="area" id="area" placeholder='Sua área de atuação' maxLength={40} minLength={3} autoComplete='off' required />
        </div>

        <div className='info-form-input'>
          <h3>Preferência de Emprego <span className='pink-span'>*</span></h3>
          <select name="preferencia_emprego" id="preferencia_emprego" required>
            <option value="">Escolha sua preferência</option>
            <option value="Presencial">Presencial</option>
            <option value="Hibrido">Hibrido</option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>


      </InfoForm>
    </div>
  )
}

export default TipoEmprego