"use client"

// Imports NextAuth

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { IoPeopleSharp, IoSearchSharp } from 'react-icons/io5'
import HtmlContent from '@components/Others/HtmlContent'

import { IoEyeOutline } from 'react-icons/io5'
import Certificado from './Certificado'
import Experiencia from './Experiencia'
import { infoUser } from '@utils/userContext'

const MainProfile = ({ content, setShowAddExperience, setShowAddCertificado, setShowAddDescricao }) => {

  const [certificados, setCertificados] = useState([])
  const [experiencias, setExperiencias] = useState([])

  const { data } = infoUser()
  const descricao = content.resumo

  const fetchData = async () => {
    if (data._id != undefined) {
      try {
        // Fetch Certificados
        const responseCertificados = await fetch(`/api/profile/certificado/user/${data._id}`)
        const fetchCertificados = await responseCertificados.json()
        setCertificados(fetchCertificados)

        // Fetch Experiencias
        const responseExperiencias = await fetch(`/api/profile/experiencia/user/${data._id}`)
        const fetchExperiencias = await responseExperiencias.json()
        setExperiencias(fetchExperiencias)

      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (data) {
      fetchData()
    }
  }, [data])

  return (
    <div className='main-profile-container'>

      <div className='container-section-profile' id="analytics">
        <div className='section-top'>
          <h3>Analytics</h3>
        </div>
        <div className='section-bottom'>
          <div className="analytics-flex">
            <div className="analytic-item">
              <div>
                <IoPeopleSharp size={20} />
              </div>
              <div>
                <h4>{data.profile_views ? "0" : `${data.profile_views}`} Visualizações de Perfil</h4>
                <p>Veja quantas pessoas que visualizaram o seu perfil recentemente</p>
              </div>
            </div>

            <div className="analytic-item">
              <div>
                <IoSearchSharp size={20} />
              </div>
              <div>
                <h4>{data.profile_searchs ? "0" : `${data.profile_searchs}`} Ocorrências de buscas</h4>
                <p>Veja com qual frequência você apareceu em resultados de busca</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Recursos</h3>
          {content._id === data._id ? (
            <span className='section-icon'>
              <IoEyeOutline size={15} />
              <p>somente você pode ver</p>
            </span>
          ) : (
            <></>
          )}
        </div>
        <div className='section-bottom'>
          <h6>Sem dados...</h6>
          <p>Nenhuma informações sobre certificações disponível!</p>
        </div>
      </div>

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Sobre Mim</h3>
        </div>
        {content.resumo ? (
          <div>
            <div className="resumo-container-profile">
              <HtmlContent html={descricao} />
            </div>
            {content._id === data._id ? (
              <Link href="#top-profile">
                <div className='section-button center' onClick={() => setShowAddDescricao(true)}>
                  Alterar Descrição
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className='section-bottom'>
            <h6>Sem dados...</h6>
            <p>Nenhuma descrição sobre você disponível!</p>
            {content._id === data._id ? (
              <Link href="#top-profile">
                <div className='section-button center' onClick={() => setShowAddDescricao(true)}>
                  Adicionar uma Descrição
                </div>
              </Link>
            ) : (
              <></>
            )}
          </div>
        )
        }
      </div >

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Atividade</h3>
          <p className='pink-span'>{data.seguidores} seguidores</p>
        </div>
        <div className='section-bottom'>
          <h6>Você não postou nada recentemente</h6>
          <p>Suas publicações recentes irão aparecer aqui</p>
        </div>
      </div>

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Licenças e Certificações</h3>
        </div>
        <div className='section-bottom'>
          {certificados.length > 0 ? (
            <div>
              {certificados.map((certificado) => (
                <Certificado key={certificado._id} certificado={certificado} />
              ))}
              <Link href="#top-profile">
                <div className='section-button center' onClick={() => setShowAddCertificado(true)}>
                  Adicionar Certificações
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <h6>Sem dados...</h6>
              <p>Nenhuma informações sobre certificações disponível!</p>
              <Link href="#top-profile">
                <div className='section-button center' onClick={() => setShowAddCertificado(true)}>
                  Adicionar Certificações
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Experiência Profissional</h3>
        </div>
        <div className='section-bottom'>
          {experiencias.length > 0 ? (
            <div>
              {experiencias.map((experiencia) => (
                <Experiencia key={experiencia._id} experiencia={experiencia} />
              ))}
              <Link href="#body">
                <div className='section-button center' onClick={() => setShowAddExperience(true)}>
                  Adicionar Experiência
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <h6>Sem dados...</h6>
              <p>Nenhuma informações sobre experiência disponível!</p>
              <Link href="#body">
                <div className='section-button center' onClick={() => setShowAddExperience(true)}>
                  Adicionar Experiência
                </div>
              </Link>
            </div>
          )}
        </div>
      </div >

    </div >
  )
}

export default MainProfile