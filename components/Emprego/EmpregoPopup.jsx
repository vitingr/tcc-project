"use client"

import React from 'react'
import { IoPeopleSharp, IoListOutline, IoBriefcase, IoBusinessOutline, IoCashSharp } from 'react-icons/io5'
import HtmlContent from '@components/Others/HtmlContent'
import { infoUser } from '@utils/userContext'
import ToastMessage from '@components/Others/ToastMessage'
import { toast } from 'react-toastify'

const EmpregoPopup = ({ info }) => {

  const { data } = infoUser()
  const descricao = info.descricao

  const aplicarVaga = async () => {
    console.log(data.foto)
    if (data._id != undefined) {
      try {
        const response = await fetch("/api/vaga/candidatar", {
          method: "POST",
          body: JSON.stringify({
            userId: data._id,
            pageId: info.empresa,
            vagaId: info._id,
            foto: info.foto,
            fotoCandidato: data.foto,
            nome: data.nomeCompleto,
            titulo: info.titulo,
            cargo: info.cargo,
            descricao: info.descricao
          })
        })

        if (response.ok) {
          toast.success("Você se candidatou a essa vaga!")
        } else {
          toast.error("Não é possível se candidatar duas vezes na mesma vaga")
        }
      } catch (error) {
        toast.error("Não foi possível se candidatar a essa vaga!")
      }
    }
  }

  return (
    <div className='emprego-popup-container'>
      <ToastMessage />
      <h1>{info.titulo}</h1>
      <h2>{info.nomeEmpresa}- {info.local} {info.tipo} - 0 candidatas</h2>

      <div className='emprego-stats'>
        <div className='emprego-stat'>
          <IoBriefcase size={16} />
          <p>Emprego {info.tipo}</p>
        </div>

        <div className='emprego-stat'>
          <IoPeopleSharp size={16} />
          <p>+10.000 colaboradoras</p>
        </div>

        <div className='emprego-stat'>
          <IoBusinessOutline size={16} />
          <p>{info.local} - Brasil</p>
        </div>

        <div className='emprego-stat'>
          <IoListOutline size={16} />
          <p>Requisitos: {info.requisitos}</p>
        </div>
      </div>

      <div className='emprego-stat'>
        <IoCashSharp size={16} />
        <p>Salário: {info.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </div>

      <div className='main-info-emprego'>
        <h2>Sobre a Vaga</h2>
        <p><HtmlContent html={descricao} /></p>
      </div>

      <div>
        <button className='section-button center' onClick={() => aplicarVaga()}>
          Aplicar-se
        </button>
      </div>

    </div>
  )
}

export default EmpregoPopup