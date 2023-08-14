// Imports React
import React from 'react'
import Image from 'next/image'
import { IoNewspaperOutline, IoMailOutline, IoSchoolOutline, IoCallOutline, IoGlobeOutline } from 'react-icons/io5'

// Imports Components
import MainProfile from './MainProfile'

const profile = ({ data, showAddExperience, showAddCertificado, showEditProfile, showAddDescricao }) => {

  return (
    <div className='profile-container'>
      <div className='profile-container-top' id="profile-top">
        <div className='profile-bg' style={{ backgroundImage: `url(${data.background})` }}></div>
        <div className='main-profile'>
          <div className='profile-photo'>
            <img src={data.foto} alt='photo-profile' className='big-rounded-photo' />
            {data.logado ? (
              <div className='online'></div>
            ) : (
              <div className='offline'> </div>
            )}
          </div>
          <div className='profile-info'>
            <div className='top-profile-info'>
              <div className='profile-name'>
                <h2>{data.nomeCompleto}</h2>
                <div className='edit-profile' onClick={() => showEditProfile(true)}>
                  Editar Perfil
                </div>
              </div>
              <p className='pink-span'>{data.seguidores} seguidores</p>
            </div>
            <div className='main-profile-info'>
              {data.email ? (
                <div className='info-section'>
                  <IoMailOutline size={15} />
                  {data.email}
                </div>
              ) : (
                <div></div>
              )}
              {data.resumo ? (
                <div className='info-section'>
                  <IoNewspaperOutline size={15} />
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio minima sunt placeat perferendis quia tempora eius laborum cumque quas! Rem inventore veniam, dolorem itaque tempore expedita laudantium aperiam iusto aliquid.
                </div>
              ) : (
                <div></div>
              )}

              {data.formacao ? (
                <div className='info-section'>
                  <IoSchoolOutline size={15} />
                  {data.formacao}
                </div>
              ) : (
                <div></div>
              )}

              {data.telefone ? (
                <div className='info-section'>
                  <IoCallOutline size={15} />
                  {data.telefone}
                </div>
              ) : (
                <div></div>
              )}

              {data.website ? (
                <div className='info-section'>
                  <IoGlobeOutline size={15} />
                  {data.website}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className='bottom-profile-info'>
              {data.endereco ? (
                <div className='endereco'>Santa Bárbara d'Oeste, São Paulo, Brasil <span className='pink-span'>Contact Info</span></div>
              ) : (
                <div> </div>
              )}
            </div>

          </div>
        </div>

      </div>
      <div className='profile-container-main'>
        <MainProfile content={data} setShowAddExperience={showAddExperience} setShowAddCertificado={showAddCertificado} setShowAddDescricao={showAddDescricao} />
      </div>
    </div>
  )
}

export default profile