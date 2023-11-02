"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import { toast } from 'react-toastify'
import TextEditor from '@components/Others/TextEditor'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'
import { CIDADES_BRASIL } from '@constants/json-cidades'

const CreateVaga = ({ handleClick, fetchData }) => {

  const { data } = infoUser()

  const [titulo, setTitulo] = useState("")
  const [cargo, setCargo] = useState("")
  const [tipo, setTipo] = useState("")
  const [requisitos, setRequisitos] = useState("")
  const [sobre, setSobre] = useState("")
  const [salario, setSalario] = useState("")
  const [beneficios, setBeneficios] = useState("")
  const [pais, setPais] = useState("")
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")

  const [cidadesList, setCidadesList] = useState([])

  const buscaCidadesPorEstado = (estado) => {
    var estadoSelecionado = CIDADES_BRASIL.estados.find((sigla) => sigla.sigla === estado)
    var cidades = estadoSelecionado.cidades
    return cidades;
  }

  const handleChangeEstado = (e) => {
    const estado = e.target.value;
    setEstado(estado)
    const cidadesDoEstado = buscaCidadesPorEstado(estado)
    setCidadesList(cidadesDoEstado);
  };

  const createVaga = async (e) => {
    e.preventDefault()

    try {
      const local = `${pais} - ${estado}, ${cidade}`

      const response = await fetch("/api/vaga/new", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          titulo: titulo,
          cargo: cargo,
          tipo: tipo,
          requisitos: requisitos,
          sobre: sobre,
          salario: salario,
          beneficios: beneficios,
          local: local
        })
      })

      if (response.ok) {
        handleClick(false)
        fetchData()
        toast.success("Vaga criada com sucesso!")
      } else {
        toast.error("Houve um erro ao criar a vaga")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup title={"Adicone Oportunidades de Emprego"} subtitle={"Informe as vagas e oportunidades de emprego para mulheres que a sua empresa está oferencendo."} handleClick={handleClick} classStyles={""}>
      <ToastMessage />
      <form onSubmit={(e) => createVaga(e)}>

        <div className='input-add-container'>
          <p>Título</p>
          <input type="text" name="titulo" id="add-input" className='add-input' placeholder='ex: Analista de RH - Presencial.' autoComplete='off' maxLength={60} minLength={4} onChange={(e) => setTitulo(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Cargo</p>
          <input type="text" name="cargo" id="add-input" className='add-input' placeholder='ex: Cargo oferecido.' autoComplete='off' maxLength={65} minLength={4} onChange={(e) => setCargo(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>País</p>
          <select name="pais" id="pais" onChange={(e) => setPais(e.target.value)} className='add-input' required>
            <option value="">Selecione um país</option>
            <option value="Brasil">Brasil</option>
          </select>
        </div>

        <div className='input-add-container'>
          <p>Estado / Distrito</p>
          <select onChange={handleChangeEstado} name='estado' id='estado' className='add-input' required>
            <option value="">Selecione um estado</option>
            {CIDADES_BRASIL.estados.map((estado) => (
              <option key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </option>
            ))}
          </select>
        </div>

        <div className='input-add-container'>
          <p>Cidade</p>
          <select name='cidade' id='cidade' onChange={(e) => setCidade(e.target.value)} className='add-input' required>
            <option value="">Selecione uma cidade</option>
            {cidadesList.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>
        </div>

        <div className='input-add-container'>
          <p>Tipo</p>
          <select name="modelo" id="modelo" className='add-input' placeholder='Modelo do emprego' onChange={(e) => setTipo(e.target.value)} required>
            <option value=""></option>
            <option value="Presencial">Presencial</option>
            <option value="Hibrido">Híbrido</option>
            <option value="Remoto">Remoto</option>
          </select>
        </div>

        <div className='input-add-container'>
          <p>Requisitos</p>
          <input type="text" name="requisitos" id="add-input" className='add-input' placeholder='Requisitos Básicos.' autoComplete='off' maxLength={80} minLength={4} onChange={(e) => setRequisitos(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Sobre a vaga</p>
          <TextEditor setValue={setSobre} />
        </div>

        <div className='input-add-container'>
          <p>Benefícios para mulheres</p>
          <input type="text" name="cargo" id="add-input" className='add-input' placeholder='Benefícios oferecidos exclusivamente para mulheres.' autoComplete='off' maxLength={65} minLength={4} onChange={(e) => setBeneficios(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Salário em Reais</p>
          <input type="number" name="salario" id="add-input" className='add-input' placeholder='exK R$1900,00' autoComplete='off' maxLength={60} minLength={4} onChange={(e) => setSalario(e.target.value)} required />
        </div>

        <button type="submit" className='add-button center'>
          Adicionar Vaga
        </button>
      </form>
    </Popup>
  )
}

export default CreateVaga