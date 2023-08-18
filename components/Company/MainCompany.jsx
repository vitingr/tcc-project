"use client"

import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import { IoAddSharp, IoOpenOutline } from 'react-icons/io5'
import CompanyFeed from './CompanyFeed'
import Link from 'next/link'

const MainCompany = ({ content, dono, setCreateVaga, setEditCompany, handleClick }) => {

  const { data } = infoUser()
  const [posts, setPosts] = useState([])
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    if (data._id !== undefined && content._id !== undefined) {
      console.log(content)
      console.log(data)
      if (content.dono != data._id) {
        if (content.seguidores.includes(data._id)) {
          setFollow(true)
        } else {
          setFollow(false)
        }
      }
    }
  }, [data, content])

  return (
    <div className='main-company-container' id="about">
      <div className='main-company-color-container'>
        <div className='bg-company' style={{ backgroundImage: `url(${content.background})` }}></div>
        <div className='main-company-content'>
          <div className='main-company-logo-container'>
            <img src={content.foto} alt="photo-company" className='main-company-logo' />
          </div>
          <div className='main-company-info'>
            <div className='top-company-info'>
              <h1>{content.nome}</h1>
              <p>{content.industria} ● Santa Bárbara d'Oeste, SP ● {content.qtdSeguidores} seguidores ● {content.qtdFuncionarios}</p>
            </div>
            <div className='mid-company-info'>
              <div className='options-company'>
                {content.dono === data._id ? (
                  <div className='option-mid-company gray' onClick={() => setEditCompany(true)}>
                    Editar Página
                  </div>
                ) : (
                  <>
                    {follow ? (
                      <div className='option-mid-company color' >
                        <IoAddSharp size={16} /> Deixar de Seguir
                      </div>
                    ) : (
                      <div className='option-mid-company color' onClick={() => handleClick(content._id)}>
                        <IoAddSharp size={16} /> Seguir
                      </div>
                    )}
                  </>
                )}
                {content.website ? (
                  <Link href={content.website} target='_blank'>
                    <div className='option-mid-company white'>Visitar Website <IoOpenOutline size={16} /></div>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className='bottom-company-info'>
              <div className='company-nav-item'>Home</div>
              <div className='company-nav-item'>Sobre</div>
              <div className='company-nav-item'>Posts</div>
              <div className='company-nav-item'>Vagas</div>
              <div className='company-nav-item'>Seguidores</div>
              <div className='company-nav-item'>Eventos</div>
            </div>
          </div>
        </div>
      </div>

      <div className='company-feed-container'>
        <CompanyFeed info={content} dono={dono} posts={posts} setCreateVaga={setCreateVaga} />
      </div>
    </div >
  )
}

export default MainCompany