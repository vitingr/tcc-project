// Imports React

import React from 'react'
import Image from 'next/image'
import { IoNewspaperOutline, IoMailOutline, IoSchoolOutline, IoCallOutline, IoGlobeOutline } from 'react-icons/io5'

// Imports Components
import MainProfile from './MainProfile'
import { infoUser } from '@utils/userContext'
import { useEffect } from 'react'
import Link from 'next/link'
import Loader from '@components/Others/Loader'

const profile = ({ content, showAddExperience, showAddCertificado, showEditProfile, showAddDescricao }) => {

  const { data } = infoUser()

  return data ? (
    <div className='profile-container'>
      <div className='profile-container-top' id="profile-top">
        <div className='profile-bg' style={{ backgroundImage: `url(${content.background})` }}></div>
        <div className='main-profile'>
          <div className='profile-photo'>
            <img src={content.foto} alt='photo-profile' className='big-rounded-photo' />
            {content.logado ? (
              <div className='online'></div>
            ) : (
              <div className='offline'> </div>
            )}
          </div>
          <div className='profile-info'>
            <div className='top-profile-info'>
              <div className='profile-name'>
                <h2>{content.nomeCompleto}</h2>
                {data._id === content._id ? (
                  <div className='edit-profile' onClick={() => showEditProfile(true)}>
                    Editar Perfil
                  </div>
                ) : (
                  <div className='edit-profile'>
                    Adicionar
                  </div>
                )}
              </div>
              <Link href={`/usuario/seguidores/${content._id}`}>
                <p className='pink-span pink-hover'>{content.seguidores} seguidores</p>
              </Link>
            </div>
            <div className='main-profile-info'>
              {content.email ? (
                <div className='info-section'>
                  <IoMailOutline size={15} />
                  {content.email}
                </div>
              ) : (
                <div></div>
              )}
              {content.resumo ? (
                <div className='info-section'>
                  <IoNewspaperOutline size={15} />
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio minima sunt placeat perferendis quia tempora eius laborum cumque quas! Rem inventore veniam, dolorem itaque tempore expedita laudantium aperiam iusto aliquid.
                </div>
              ) : (
                <div></div>
              )}

              {content.formacao ? (
                <div className='info-section'>
                  <IoSchoolOutline size={15} />
                  {content.formacao}
                </div>
              ) : (
                <div></div>
              )}

              {content.telefone ? (
                <div className='info-section'>
                  <IoCallOutline size={15} />
                  {content.telefone}
                </div>
              ) : (
                <div></div>
              )}

              {content.website ? (
                <div className='info-section'>
                  <IoGlobeOutline size={15} />
                  {content.website}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className='bottom-profile-info'>
              {content.endereco ? (
                <div className='endereco'>Santa Bárbara d'Oeste, São Paulo, Brasil <span className='pink-span'>Contact Info</span></div>
              ) : (
                <div> </div>
              )}
            </div>

          </div>
        </div>

      </div>
      <div className='profile-container-main'>
        <MainProfile content={content} setShowAddExperience={showAddExperience} setShowAddCertificado={showAddCertificado} setShowAddDescricao={showAddDescricao} />
      </div>
    </div>
  ) : (
    <Loader />
  )
}

export default profile