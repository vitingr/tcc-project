"use client"

// Imports NextAuth
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { IoEyeOutline } from 'react-icons/io5'
import Certificado from './Certificado'
import Experiencia from './Experiencia'

const MainProfile = ({ data, setShowAddExperience, setShowAddCertificado }) => {

  const [certificados, setCertificados] = useState([])
  const [experiencias, setExperiencias] = useState([])

  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (session !== undefined && data._id !== undefined) {

        // Fetch Certificados
        const responseCertificados = await fetch(`/api/profile/certificado/user/${session?.user.id}`)
        const fetchCertificados = await responseCertificados.json()
        setCertificados(fetchCertificados)

        // Fetch Experiencias
        const responseExperiencias = await fetch(`/api/profile/experiencia/user/${session?.user.id}`)
        const fetchExperiencias = await responseExperiencias.json()
        setExperiencias(fetchExperiencias)
      }
    }
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <div className='main-profile-container'>

      <div className='container-section-profile' id="analytics">
        <div className='section-top'>
          <h3>Analystics</h3>
        </div>
        <div className='section-bottom'>
          <h6>Sem dados...</h6>
          <p>Nenhuma informações sobre seu perfil disponível!</p>
        </div>
      </div>

      <div className='container-section-profile'>
        <div className='section-top'>
          <h3>Recursos</h3>
          {data._id === session?.user.id ? (
            <span className='section-icon'>
              <IoEyeOutline size={15} />
              <p>somente você pode ver</p>
            </span>
          ) : (
            <div></div>
          )}
        </div>
        <div className='section-bottom'>
          <h6>Sem dados...</h6>
          <p>Nenhuma informações sobre certificações disponível!</p>
        </div>
      </div>

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
              <Link href="#top-profilm, e">
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
              <Link href="#top-profile">
                <div className='section-button center' onClick={() => setShowAddExperience(true)}>
                  Adicionar Experiência
                </div>
              </Link>
            </div>
          ) : (
            <div>
              <h6>Sem dados...</h6>
              <p>Nenhuma informações sobre experiência disponível!</p>
              <Link href="#top-profile">
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