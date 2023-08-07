"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'
import { infoUser } from '@utils/userContext'

const CreateVaga = ({ handleClick }) => {

  const { data } = infoUser()

  const [titulo, setTitulo] = useState("")
  const [cargo, setCargo] = useState("")
  const [tipo, setTipo] = useState("")
  const [requisitos, setRequisitos] = useState("")
  const [sobre, setSobre] = useState("")
  const [salario, setSalario] = useState("")

  const createVaga = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/vaga/new", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          titulo: titulo,
          cargo: cargo,
          tipo: tipo,
          requisitos: requisitos,
          sobre: sobre,
          salario: salario
        })
      })

      if (response.ok) {
        handleClick(false)
        toast.success("Vaga criada com sucesso!")
      } else {
        toast.error("Houve um erro ao criar a vaga")
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Popup title={"Adicone Oportunidades de Emprego"} subtitle={"Informe as vagas e oportunidades de emprego para mulheres que a sua empresa está oferencendo."} handleClick={handleClick} classStyles={"padding-create-vaga"}>
      <ToastMessage />
      <form>

        <div className='input-add-container'>
          <p>Título</p>
          <input type="text" name="titulo" id="add-input" className='add-input' placeholder='ex: Analista de RH - Presencial.' autoComplete='off' maxLength={60} minLength={4} onChange={(e) => setTitulo(e.target.value)} required />
        </div>

        <div className='input-add-container'>
          <p>Cargo</p>
          <input type="text" name="cargo" id="add-input" className='add-input' placeholder='ex: Cargo oferecido.' autoComplete='off' maxLength={65} minLength={4} onChange={(e) => setCargo(e.target.value)} required />
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
          <textarea name="sobre" id="add-input" className='add-input about-input' placeholder='Fale sobre a vaga.' autoComplete='off' minLength={4} cols="60" rows="10" onChange={(e) => setSobre(e.target.value)} required></textarea>
        </div>

        <div className='input-add-container'>
          <p>Salário em Reais</p>
          <input type="number" name="salario" id="add-input" className='add-input' placeholder='exK R$1900,00' autoComplete='off' maxLength={60} minLength={4} onChange={(e) => setSalario(e.target.value)} required />
        </div>

        <button type="submit" className='add-button center' onClick={(e) => createVaga(e)}>
          Adicionar Vaga
        </button>
      </form>
    </Popup>
  )
}

export default CreateVaga