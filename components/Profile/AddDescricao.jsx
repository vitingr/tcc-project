"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'
import Popup from '@components/Popup'
import TextEditor from '@components/Others/TextEditor'

const AddDescricao = ({ data, handleClick }) => {

  const { getInfo } = infoUser()
  const [descricao, setDescricao] = useState(data.resumo)

  const createResumo = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/user/updateInfo", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          nome: data.nome,
          sobrenome: data.sobrenome,
          telefone: data.telefone,
          website: data.website,
          cargo_atual: data.cargo_atual,
          foto: data.foto,
          background: data.background,
          area: data.area,
          ultima_empresa: data.ultima_empresa,
          resumo: descricao
        })
      })

      if (response.ok) {
        toast.success("O seu perfil foi atualizado com sucesso!")
        getInfo()
        handleClick(false)
      } else {
        toast.error("Não foi possível atualizar o perfil do usuário")
      }

    } catch (error) {
      toast.error("Não foi possível atualizar o perfil do usuário")
    }
  }

  return (
    <Popup title={"Adicionar um Resumo"} subtitle={"Adicione uma descrição sobre você, pois é uma excelente maneira de demonstrar suas qualidades e habilidades para as pessoas ao seu redor"} handleClick={handleClick}>
      <ToastMessage />
      <form>
        <div className='input-add-container'>
          <p>Empresa <span className="pink-span">*</span></p>
          {/* <textarea name="resumo" id="resumo" cols="30" rows="20" placeholder="Sua descrição aqui" autoComplete='off' onChange={(e) => setDescricao(e.target.value)} className='add-input' value={descricao} required>
          
          </textarea> */}
          <TextEditor value={descricao} setValue={setDescricao} />
        </div>
        <button type="submit" className='add-button center' onClick={(e) => createResumo(e)}>
          Adicionar
        </button>
      </form>
    </Popup>
  )
}

export default AddDescricao