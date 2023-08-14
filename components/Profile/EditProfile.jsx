"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import TextEditor from '@components/TextEditor'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'
import { infoUser } from '@utils/userContext'
import UploadPhoto from '@components/UploadPhoto'

const EditProfile = ({ data, handleClick }) => {

  const {getInfo} = infoUser()

  const [nome, setNome] = useState(data.nome)
  const [sobrenome, setSobrenome] = useState(data.sobrenome)
  const [telefone, setTelefone] = useState(data.telefone)
  const [website, setWebsite] = useState(data.website)
  const [resumo, setResumo] = useState(data.resumo)
  const [cargoAtual, setCargoAtual] = useState(data.cargo_atual)
  const [area, setArea] = useState(data.area)
  const [ultimaEmpresa, setUltimaEmpresa] = useState(data.ultima_empresa)
  const [teste, setTeste ]= useState("")
  const [foto, setFoto] = useState(data.foto)
  const [background, setBackground] = useState(data.background)

  const [showProfessionalInfo, setShowProfessionalInfo] = useState(false)

  const updateProfile = async (e) => {

    e.preventDefault()

    try {
      const response = await fetch("/api/user/updateInfo", {
        method: "POST",
        body: JSON.stringify({
          userId: data._id,
          nome: nome,
          sobrenome: sobrenome,
          telefone: telefone,
          website: website,
          cargo_atual: cargoAtual,
          foto: foto,
          background: background,
          area: area,
          ultima_empresa: ultimaEmpresa,
          resumo: ""
        })
      })

      if (response.ok) {
        getInfo()
        toast.success("O seu perfil foi atualizado com sucesso!")
      } else {
        toast.error("Não foi possível atualizar o perfil do usuário")
      }

    } catch (error) {
      toast.error("Não foi possível atualizar o perfil do usuário")
    }

  }

  return (
    <Popup title={"Editar Perfil"} subtitle={"Edite seu perfil para atrair novos usuários e impulsionar a sua rede de networking"} handleClick={handleClick}>
      <ToastMessage />
      <div className='edit-profile-types'>
        <div className='edit-profile-type' onClick={() => setShowProfessionalInfo(false)}>
          Informações Básicas
        </div>
        <div className='edit-profile-type' onClick={() => setShowProfessionalInfo(true)}>
          Informações Profissionais
        </div>
      </div>
      <div className='edit-profile-container'>
        <form className='edit-profile-form'>
          {showProfessionalInfo ? (
            <div>
              <div className='input-add-container'>
                <p>Resumo</p>
                <TextEditor value={teste} onEditorChange={(e) => setTeste(e.target.value)} />
                {/* <input type="text" name="resumo" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setResumo(e.target.value)} value={nome} required /> */}
              </div>
              <div className='input-add-container'>
                <p>Cargo Atual</p>
                <input type="text" name="cargo_atual" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setCargoAtual(e.target.value)} value={cargoAtual} required />
              </div>
              <div className='input-add-container'>
                <p>Formação</p>
                <select name="formacao" id="formacao" className='add-input' placeholder='Tipo de contato de telefone'>
                  <option value=""></option>
                </select>
              </div>
              <div className='input-add-container'>
                <p>Área</p>
                <input type="text" name="area" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setArea(e.target.value)} value={area} required />
              </div>
              <div className='input-add-container'>
                <p>Ultima Empresa</p>
                <input type="text" name="ultima_empresa" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setUltimaEmpresa(e.target.value)} value={ultimaEmpresa} required />
              </div>

            </div>
          ) : (
            <div>
              <div className='input-add-container'>
                <p>Nome</p>
                <input type="text" name="nome" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setNome(e.target.value)} value={nome} required />
              </div>
              <div className='input-add-container'>
                <p>Sobrenome</p>
                <input type="text" name="sobrenome" id="add-input" className='add-input' placeholder='Sobrenome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setSobrenome(e.target.value)} value={sobrenome} required />
              </div>

              <div className='edit-photos-container'>
                <div className='edit-photo-profile'>
                  <div className='left-edit-photo'>
                    <img src={foto} alt="photo" />
                  </div>
                  <div className='right-edit-photo'>
                    <h2>Alterar Foto de Perfil</h2>
                    <UploadPhoto file={setFoto} value={foto} />
                  </div>
                </div>

                <div className='edit-photo-profile'>
                  <div className='left-edit-photo'>
                    <img src={background} alt="photo" />
                  </div>
                  <div className='right-edit-photo'>
                    <h2>Alterar Foto de Fundo</h2>
                    <UploadPhoto file={setBackground} value={background} />
                  </div>
                </div>
              </div>

              <div className='input-add-container'>
                <p>Número de Telefone</p>
                <input type="text" name="telefone" id="add-input" className='add-input' placeholder='Número de telefone para contato.' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setTelefone(e.target.value)} value={telefone} />
              </div>

              <div className='input-add-container'>
                <p>Tipo de Contato</p>
                <select name="tipo_contato" id="tipo_contato" className='add-input' placeholder='Tipo de contato de telefone'>
                  <option value=""></option>
                  <option value="celular">Celular</option>
                  <option value="casa">Casa</option>
                  <option value="Trabalho">Trabalho</option>
                </select>
              </div>

              <div className='input-add-container'>
                <p>Site Pessoal</p>
                <input type="text" name="website" id="add-input" className='add-input' placeholder='Seu portólio' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setWebsite(e.target.value)} value={website} />
              </div>
            </div>
          )
          }

          <button type="submit" className='add-button center' onClick={(e) => updateProfile(e)}>
            Confirmar Alterações
          </button>

        </form >
      </div >
    </Popup >
  )
}

export default EditProfile