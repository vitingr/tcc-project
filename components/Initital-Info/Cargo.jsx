import React from 'react'
import InfoForm from './InfoForm'

const Cargo = ({ step, setStep, cargoAtual, setCargoAtual, ultimoContrato, setUltimoContrato, ultimaEmpresa, setUltimaEmpresa }) => {
  return (
    <div>
      <InfoForm setStep={setStep} step={step}>
        <div className='info-form-input'>
          <h3>Cargo mais recente / atual <span className='pink-span'>*</span></h3>
          <input type="text" name="cargo_recente" id="cargo_recente" minLength="3" maxLength="40" onChange={(e) => setCargoAtual(e.target.value)} value={cargoAtual} placeholder="Seu cargo atual / mais recente" autoComplete='off' required />
        </div>

        <div className='info-form-input'>
          <h3>Tipo de Emprego <span className='pink-span'>*</span></h3>
          <select name="tipo_emprego" id="tipo_emprego" onChange={(e) => setUltimoContrato(e.target.value)} value={ultimoContrato} required>
            <option value="">Tipo do Contrato</option>
            <option value="determinado">Tempo determinado</option>
            <option value="indeterminado">Tempo Indeterminado</option>
            <option value="eventual">Eventual</option>
            <option value="estagio">Estágio</option>
            <option value="experiencia">Experiência</option>
            <option value="intermitente">Intermitente</option>
            <option value="home_office">Home Office</option>
            <option value="jovem_aprendiz">Jovem Aprendiz</option>
            <option value="parcial">Parcial</option>
            <option value="autonomo">Autônomo</option>
          </select>
        </div>

        <div className='info-form-input'>
          <h3>Empresa mais recente<span className='pink-span'>*</span></h3>
          <input type="text" name="cargo_recente" id="cargo_recente" placeholder="Última empresa que você trabalhou" minLength="3" maxLength="45" autoComplete='off' value={ultimaEmpresa} onChange={(e) => setUltimaEmpresa(e.target.value)} required />
        </div>
      </InfoForm>
    </div>
  )
}

export default Cargo