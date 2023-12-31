"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import TextEditor from '@components/Others/TextEditor'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/Others/ToastMessage'
import { infoUser } from '@utils/userContext'
import UploadPhoto from '@components/Others/UploadPhoto'

const EditProfile = ({ content, handleClick }) => {

  const {getInfo} = infoUser()

  const [nome, setNome] = useState(content.nome)
  const [sobrenome, setSobrenome] = useState(content.sobrenome)
  const [telefone, setTelefone] = useState(content.telefone)
  const [website, setWebsite] = useState(content.website)
  const [resumo, setResumo] = useState(content.resumo)
  const [cargoAtual, setCargoAtual] = useState(content.cargo_atual)
  const [area, setArea] = useState(content.area)
  const [ultimaEmpresa, setUltimaEmpresa] = useState(content.ultima_empresa)
  const [foto, setFoto] = useState(content.foto)
  const [background, setBackground] = useState(content.background)
  const [headline, setHeadline] = useState(content.headline)

  const [showProfessionalInfo, setShowProfessionalInfo] = useState(false)

  const updateProfile = async (e) => {

    e.preventDefault()

    try {
      const response = await fetch("/api/user/updateInfo", {
        method: "POST",
        body: JSON.stringify({
          userId: content._id,
          nome: nome,
          sobrenome: sobrenome,
          telefone: telefone,
          website: website,
          cargo_atual: cargoAtual,
          foto: foto,
          background: background,
          area: area,
          ultima_empresa: ultimaEmpresa,
          resumo: resumo,
          headline: headline
        })
      })

      if (response.ok) {
        getInfo()
        handleClick(false)
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
                <textarea name="headline" id="headline" cols="30" rows="10" className='add-input' placeholder='Descriçao de Perfil' autoComplete='off' onChange={(e) => setHeadline(e.target.value)} value={headline} required></textarea>
              </div>
              <div className='input-add-container'>
                <p>Cargo Atual</p>
                <input type="text" name="cargo_atual" id="add-input" className='add-input' placeholder='Ultimo Cargo / Cargo Atual' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setCargoAtual(e.target.value)} value={cargoAtual} required />
              </div>
              <div className='input-add-container'>
                <p>Formação</p>
                <select name="formacao" id="formacao" className='add-input' placeholder='Tipo de contato de telefone'>
                  <option value=""></option>
                </select>
              </div>
              <div className='input-add-container'>
                <p>Área</p>
                <input type="text" name="area" id="add-input" className='add-input' placeholder='Sua Área' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setArea(e.target.value)} value={area} required />
              </div>
              <div className='input-add-container'>
                <p>Ultima Empresa</p>
                <input type="text" name="ultima_empresa" id="add-input" className='add-input' placeholder='Última Empresa / Empresa Atual' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setUltimaEmpresa(e.target.value)} value={ultimaEmpresa} required />
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