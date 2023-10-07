"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import VagaCard from './VagaCard'
import Post from '@components/Post'
import { motion } from "framer-motion";

const CompanyFeed = ({ info, dono, setCreateVaga, setCreatePost }) => {

  const { data: session } = useSession()
  const { data } = infoUser()
  const [vagas, setVagas] = useState([])
  const [companyPosts, setCompanyPosts] = useState([])

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const getInfo = async () => {
    if (info && info._id !== undefined) {
      try {
        const result = await fetch(`/api/vaga/empresa/${info._id}`)
        const response = await result.json()
        setVagas(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getCompanyPosts = async () => {
    if (info && info._id !== undefined) {
      try {
        const result = await fetch(`/api/company/posts/${info._id}`)
        const response = await result.json()
        setCompanyPosts(response)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (session) {
      if (info) {
        getInfo()
        getCompanyPosts()
      }
    }

  }, [session, info])

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
            <p className='section-button center'>Editar Informações</p>
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
        <div className='company-posts-feed'>
          {companyPosts.length > 0 ? (
            <div className='publications-container w-full'>
              <motion.ul
                className=""
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {companyPosts.map((post) => (
                  <motion.li key={post._id} variants={item}>
                    <Post post={post} />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ) : (
            <p>
              A empresa não realizou nenhum post
            </p>
          )}
        </div>
        {dono ? (
          <Link href="#about">
            <button className='section-button center' onClick={() => setCreatePost(true)}>
              Adicionar Post
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>

      {/* Empregos Fornecidos pela Empresa */}
      <div className='company-feed-item card-items'>
        <h1>Vagas Oferecidas</h1>
        <p>Aqui é possível e analisar ver as vagas e oportunidades oferecidas exclusivamente pela empresa para mulheres ingresseram nela.</p>
        {vagas.length > 0 ? (
          <div className='vagas-card-container'>
            {vagas.map((item) => (
              <VagaCard info={item} key={item._id} />
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