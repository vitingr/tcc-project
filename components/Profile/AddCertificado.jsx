"use client"

// Imports React
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const AddCertificado = ({ data, handleClick }) => {

  const router = useRouter()
  const [nomeCurso, setNomeCurso] = useState("")
  const [nomeInstituicao, setNomeInstituicao] = useState("")
  const [erros, setErros] = useState(false)

  const createCertificado = async (e) => {
      if (nomeCurso.length > 30) {
        toast.error("O nome do curso é muito longo")
        setErros(true)
      }

      if (nomeCurso.length < 4) {
        toast.error("O nome do curso é muito curto")
        setErros(true)
      }

      if (!nomeCurso) {
        toast.error("Adicione o nome do Curso")
        setErros(true)
      }

      if (!nomeInstituicao) {
        toast.error("Adicione o nome da Instituição")
        setErros(true)
      }

      if (erros === false) {
        try {
          const response = await fetch("/api/profile/certificado/new", {
            method: "POST",
            body: JSON.stringify({
              userId: data._id,
              nome: nomeCurso,
              unidade: nomeInstituicao,
              foto: "/assets/images/bg1.jpg"
            })
          })
    
          if (response.ok) {
            handleClick(false)
            toast.success("Certificado Adicionado")
            router.push("/pages/usuario/profile")
          } 
    
        } catch (error) {
          console.log(error)
        }
      }
  }

  return (
    <div className='glassmorphism'>
      <ToastMessage />
      <div className='center-glassmorphism center'>
        <div className='add-profile-container'>
          <div className='top-add-profile-container'>
            <h2>Adicionar Certificado</h2>
            <IoCloseSharp size={15} className='icon-cursor' onClick={() => handleClick(false)} />
          </div>
          <p className='add-subtitle' >Adicione seus certificados e licenças aqui para informar e atrair mais pessoas ao seu perfil</p>
          <div className='add-profile-main'>
            <form>
              <div className='input-add-container'>
                <p>Curso</p>
                <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Curso de Administração.' autoComplete='off' maxLength={30} minLength={4} onChange={(e) => setNomeCurso(e.target.value)} required />
              </div>
              <div className='input-add-container'>
                <p>Instituição</p>
                <select name="instituicao" id="instituicao" className='add-input' placeholder='Instituição de Ensino' onChange={(e) => setNomeInstituicao(e.target.value)} required>
                  <option value=""></option>
                  <option value="teste">teste</option>
                </select>
              </div>
              <button type="submit" className='add-button center' onClick={(e) => createCertificado()}>
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCertificado