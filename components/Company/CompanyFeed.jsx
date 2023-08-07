"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import VagaCard from './VagaCard'

const CompanyFeed = ({ info, dono, posts, setCreateVaga }) => {

  const { data: session } = useSession()
  const { data } = infoUser()
  const [vagas, setVagas] = useState([])

  useEffect(() => {

    const getInfo = async () => {
      const result = await fetch(`/api/vaga/empresa/${info._id}`)
      const response = await result.json()
      setVagas(response)
    } 

    if (session) {
      getInfo()
    }

  }, [session])

  return (
    <div className='company-feed-container'>

      {/* Resumo da Empresa */}
      <div className='company-feed-item'>
        <div className='company-feed-about-top'>
          <h1>Sobre</h1>
          <p>{info.resumo} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit veritatis at ullam repellat voluptates nulla quasi praesentium dolorem blanditiis nisi! Velit debitis sequi praesentium quis ipsa aut error in. Ab? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime perferendis temporibus, assumenda repudiandae sequi eligendi aut qui, modi vero, veritatis beatae velit! Corrupti aliquid magnam a sed consequuntur non ipsa!</p>
        </div>
        <div className='company-feed-about-bottom'>
          <div className='contact-company'>
            <h3>Informações de Contato</h3>
            <Link href="#">
              contact-info.com
            </Link>
          </div>
          <div className='acoes-company'>
            <h3>Ações</h3>
            <div>
              <p>Sem informações</p>
            </div>
          </div>
        </div>
        {dono ? (
          <div className='edit-about-company'>
            <p className='btn-edit-company'>Editar Informações</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Interesse na Empresa */}
      <div className='company-feed-item interest-flex'>
        <div className='interest-left'>
          <h1>Você deseja trabalhar conosco no futuro?</h1>
          <p>
            Não está pronto para se candiinfor ou não vê uma vaga aberta relevante? Compartilhe seu perfil em particular com nossos recrutadores - você será notado por expressar interesse em nossas vagas de emprego por até um ano.</p>
          <button>
            Estou Interessado
          </button>
        </div>
        <div className='interest-right'>
          <img src="/assets/images/interest.svg" alt="image" />
        </div>
      </div>

      {/* Posts da Empresa */}
      <div className='company-feed-item'>
        <h1>Últimos Posts</h1>
        {posts.length > 0 ? (
          <></>
        ) : (
          <p>
            A empresa não realizou nenhum post
          </p>
        )}
        {dono ? (
          <button className='section-button center'>
            Adicionar Post
          </button>
        ) : (
          <></>
        )}
      </div>

      {/* Empregos Fornecidos pela Empresa */}
      <div className='company-feed-item'>
        <h1>Vagas Oferecidas</h1>
        <p>Aqui é possível e analisar ver as vagas e oportunidades oferecidas exclusivamente pela empresa para mulheres ingresseram nela.</p>
        {vagas.length > 0 ? (
          <div className='vagas-card-container'>
            {vagas.map((item) => (
              <VagaCard info={item} />
            ))}
          </div>
        ) : (
          <div className='error-msg-company'> 
            Essa empresa não possui nenhuma vaga ativa no momento
          </div>
        )}
        {dono ? (
          <Link href="#about">
            <button className='section-button center' onClick={() => setCreateVaga(true)}>
              Adicionar Vaga
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {/* Seguidores da Empresa */}
      <div className='company-feed-item'>
        <h1>Seguidores</h1>
      </div>

    </div>
  )
}

export default CompanyFeed