"use client"

import React, { useState } from 'react'
import InfoForm from './InfoForm'
import { CIDADES_BRASIL } from '@constants/json-cidades'

const Endereco = ({ step, setStep, pais, setPais, cidade, setCidade, estado, setEstado }) => {

  const [cidadesList, setCidadesList] = useState([])

  const buscaCidadesPorEstado = (estado) => {
    var estadoSelecionado = CIDADES_BRASIL.estados.find((sigla) => sigla.sigla === estado); // Vai procurar no json estados, um estado com o sigla igual ao estado Selecionado
    var cidades = estadoSelecionado.cidades
    return cidades;

    // estado busca o BA, estado selecionado para procurar no json
  }

  const handleChangeEstado = (e) => {
    const estado = e.target.value;
    setEstado(estado); // Vai retonar SP por exemplo
    const cidadesDoEstado = buscaCidadesPorEstado(estado); // Vai buscar as cidades que pertencem aquela sigla
    setCidadesList(cidadesDoEstado);
  };

  return (
    <div>
      <InfoForm setStep={setStep} step={step}>
        <div className='info-form-input'>
          <h3>País <span className='pink-span'>*</span></h3>
          <select name="pais" id="pais" onChange={(e) => setPais(e.target.value)} required>
            <option value="">Selecione um país</option>
            <option value="Brasil">Brasil</option>
          </select>
        </div>
        <div className='info-form-input'>
          <h3>Estado / Distrito <span className='pink-span'>*</span></h3>
          <select onChange={handleChangeEstado} name='estado' id='estado' required>
            <option value="">Selecione um estado</option>
            {CIDADES_BRASIL.estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>
        <div className='info-form-input'>
          <h3>Cidade <span className='pink-span'>*</span></h3>
          <select name='cidade' id='cidade' onChange={(e) => setCidade(e.target.value)} required>
            <option value="">Selecione uma cidade</option>
            {cidadesList.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>

      </InfoForm>
    </div>
  )
}

export default Endereco