"use client"

// Imports React
import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'

const AddExperience = ({ data, handleClick }) => {

  const router = useRouter()
  const [empresa, setEmpresa] = useState("")
  const [cargo, setCargo] = useState("")
  const [erros, setErros] = useState(false)

  const createExperiencia = async (e) => {
    if (empresa.length > 35) {
      toast.error("O nome da empresa é muito longa")
      setErros(true)
    }

    if (empresa.length < 4) {
      toast.error("O nome da empresa é muito curta")
      setErros(true)
    }

    if (cargo.length > 40) {
      toast.error("O nome do cargo é muito longo")
      setErros(true)
    }

    if (cargo.length < 4) {
      toast.error("O nome do cargo é muito curto")
      setErros(true)
    }

    if (!empresa) {
      toast.error("Informe a empresa trabalhada")
      setErros(true)
    }

    if (!cargo) {
      toast.error("Informe o cargo ocupado")
      setErros(true)
    }

    if (erros === false) {
      try {
        const response = await fetch("/api/profile/experiencia/new", {
          method: "POST",
          body: JSON.stringify({
            userId: data._id,
            empresa: empresa,
            cargo: cargo
          })
        })

        if (response.ok) {
          handleClick(false)
          toast.success("Experiência Adicionada")
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
            <h2>Adicionar Experiencia</h2>
            <IoCloseSharp size={15} className='icon-cursor' onClick={() => handleClick(false)} />
          </div>
          <p className='add-subtitle'>Adicione experiências de emprego para informar e atrair mais pessoas ao seu perfil</p>
          <div className='add-profile-main'>
            <form>
              <div className='input-add-container'>
                <p>Empresa</p>
                <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Natura LTDA.' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setEmpresa(e.target.value)} required />
              </div>
              <div className='input-add-container'>
                <p>Cargo</p>
                <input type="text" name="cargo" id="add-input" className='add-input' placeholder='ex: Auxiliar de Administração.' autoComplete='off' maxLength={40} minLength={4} onChange={(e) => setCargo(e.target.value)} required />
              </div>
              <button type="submit" className='add-button center' onClick={(e) => createExperiencia()}>
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddExperience