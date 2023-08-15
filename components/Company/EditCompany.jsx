"use client"

import React, { useState } from 'react'
import Popup from '@components/Popup'
import TextEditor from '@components/TextEditor'
import { toast } from 'react-toastify'

// Imports Components
import ToastMessage from '@components/ToastMessage'
import { infoUser } from '@utils/userContext'
import UploadPhoto from '@components/UploadPhoto'

const EditCompany = ({ content, handleClick }) => {

  const { getInfo } = infoUser()

  const [nome, setNome] = useState(content.nome)
  const [website, setWebsite] = useState(content.website)
  const [qtdFuncionarias, setQtdFuncionarias] = useState(content.qtdFuncionarios)
  const [industria, setIndustria] = useState(content.industria)
  const [tipo, setTipo] = useState(content.tipo)
  const [logo, setLogo] = useState(content.foto)
  const [background, setBackground] = useState(content.background)
  const [endereco, setEndereco] = useState(content.endereco)
  const [descricao, setDescricao] = useState(content.descricao)

  const [advancedInfo, setAdvancedInfo] = useState(false)

  const updateCompany = async (e) => {

    e.preventDefault()

    try {

      const response = await fetch("/api/company/update", {
        method: "POST",
        body: JSON.stringify({
          userId: content.dono,
          nome: nome,
          website: website,
          qtdFuncionarias: qtdFuncionarias,
          industria: industria,
          tipo: tipo,
          logo: logo,
          background: background,
          endereco: endereco,
          descricao: descricao
        })
      })

      console.log(response)

      if (response.ok) {
        getInfo()
        toast.success("O seu perfil foi atualizado com sucesso!")
      }

    } catch (error) {
      console.log(error)
      toast.error("Não foi possível atualizar a página da empresa")
    }

  }

  return (
    <Popup title={"Editar Perfil"} subtitle={"Edite seu perfil para atrair novos usuários e impulsionar a sua rede de networking"} handleClick={handleClick}>
      <ToastMessage />
      <div className='edit-profile-types'>
        <div className='edit-profile-type' onClick={() => setAdvancedInfo(false)}>
          Informações Básicas
        </div>
        <div className='edit-profile-type' onClick={() => setAdvancedInfo(true)}>
          Informações Avançadas
        </div>
      </div>
      <div className='edit-profile-container'>
        <form className='edit-profile-form'>
          {advancedInfo ? (
            <div>
              <div className='input-add-container'>
                <p>Descrição</p>
                <TextEditor value={descricao} setValue={setDescricao} />
                {/* <input type="text" name="resumo" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setResumo(e.target.value)} value={nome} required /> */}
              </div>
              <div className='input-create-company-container'>
                <p>Indústria <span className='pink-span'>*</span></p>
                <input type="text" name="industria" id="industria" className='input-create-company' placeholder={`Informe o ramo da sua empresa}`} value={industria} onChange={(e) => setIndustria(e.target.value)} autoComplete='off' maxLength={40} minLength={2} required />
              </div>
              <div className='input-create-company-container'>
                <p>Tamanho da empresa <span className='pink-span'>*</span></p>
                <select name="tamanho" id="tamanho" className='input-create-company' value={qtdFuncionarias} onChange={(e) => setQtdFuncionarias(e.target.value)} required>
                  <option value=""></option>
                  <option value="0 - 1 Colaboradoras">0 - 1 Colaboradoras</option>
                  <option value="2 - 10 Colaboradoras">2 - 10 Colaboradoras</option>
                  <option value="11 - 5aboradoras">11 - 50 Colaboradoras</option>
                  <option value="51 - 200 Colaboradoras">51 - 200 Colaboradoras</option>
                  <option value="201 - 500 Colaboradoras">201 - 500 Colaboradoras</option>
                  <option value="501 - 1.000 Colaboradoras">501 - 1.000 Colaboradoras</option>
                  <option value="1.001 - 5.000 Colaboradoras">1.001 - 5.000 Colaboradoras</option>
                  <option value="5.001 - 10.000 Colaboradoras">5.001 - 10.000 Colaboradoras</option>
                  <option value="+ 10.000 Colaboradoras">+ 10.000 Colaboradoras</option>
                </select>
              </div>

              <div className='input-create-company-container'>
                <p>Tipo da empresa <span className='pink-span'>*</span></p>
                <select name="tipo" id="tipo" className='input-create-company' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option value=""></option>
                  <option value="Empresa Pública">Empresa Pública</option>
                  <option value="Empresa Privada">Empresa Privada</option>
                  <option value="Empresa Governamental">Empresa Governamental</option>
                  <option value="Sem Fins Lucrativos">Sem Fins Lucrativos</option>
                  <option value="Empresa Pessoal">Empresa Pessoal</option>
                  <option value="Parceria">Parceria</option>
                  <option value="Autonomo">Autonomo</option>
                </select>
              </div>

            </div>
          ) : (
            <div>
              <div className='input-add-container'>
                <p>Nome</p>
                <input type="text" name="nome" id="add-input" className='add-input' placeholder='Nome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setNome(e.target.value)} value={nome} required />
              </div>
              <div className='input-add-container'>
                <p>Website</p>
                <input type="text" name="website" id="add-input" className='add-input' placeholder='Sobrenome' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setWebsite(e.target.value)} value={website} required />
              </div>

              <div className='edit-photos-container'>
                <div className='edit-photo-profile'>
                  <div className='left-edit-photo'>
                    <img src={logo} alt="photo" />
                  </div>
                  <div className='right-edit-photo'>
                    <h2>Alterar Logo</h2>
                    <UploadPhoto file={setLogo} value={logo} />
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
                <p>Endereço</p>
                <input type="text" name="endereco" id="add-input" className='add-input' placeholder='Seu portólio' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setEndereco(e.target.value)} value={endereco} />
              </div>
            </div>
          )
          }

          <button type="submit" className='add-button center' onClick={(e) => updateCompany(e)}>
            Confirmar Alterações
          </button>

        </form >
      </div >
    </Popup >
  )
}

export default EditCompany