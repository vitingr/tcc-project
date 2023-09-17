import React from 'react'
import Link from 'next/link'
import { IoPencilOutline, IoPeopleSharp, IoBusinessOutline, IoPodiumSharp, IoThumbsUpSharp, IoImageOutline, IoLocationOutline, IoHappyOutline } from 'react-icons/io5'

const ProfileSidebar = ({data, premiumInfo}) => {
  return (
    <div className='home-profile'>
      <div className={premiumInfo.background === 'animated' ? 'background-home-profile-animated' : 'background-home-profile'} style={{ backgroundImage: `url(${data.background})` }}>
      </div>
      <div className='photo-home-profile center'>
        <img src={data.foto} className='medium-rounded-photo' alt='photo-left' />
      </div>
      <div className='info-home-profile'>
        <div className='home-basic-info'>
          <Link href="/usuario/profile">
            <h2>{data.nomeCompleto}</h2>
          </Link>
          <p>{data.email}</p>
        </div>
        <div className='home-friends'>
          <div>
            <Link href="/usuario/amigos">
              <h4>Amizades</h4>
              <p>Adicione amigos</p>
            </Link>
          </div>
          <div className='center'>
            <Link href={`/usuario/seguidores/${data._id}`}>
              <span className="feed-friends">{data.seguidores}</span>
            </Link>
          </div>
        </div>
        <div className='home-options'>
          <Link href="/usuario/amigos">
            <li className='icon-cursor'>
              <div className='center'><IoPeopleSharp size={15} /></div>
              <div>Ver amizades</div>
            </li>
          </Link>
          <Link href="/empresa">
            <li className='icon-cursor'>
              <div className='center'><IoBusinessOutline size={15} /></div>
              <div>Conta Empresarial</div>
            </li>
          </Link>
          <Link href="/usuario/profile">
            <li className='icon-cursor'>
              <div className='center'><IoPencilOutline size={15} /></div>
              <div>Editar perfil</div>
            </li>
          </Link>
          <li className='icon-cursor'>
            <div className='center'><IoThumbsUpSharp size={15} /></div>
            <div>Minhas curtidas</div>
          </li>
          <li className='icon-cursor'>
            <div className='center'><IoPodiumSharp size={15} /></div>
            <div className='center'>Atividade perfil</div>
          </li>
        </div>
      </div>
    </div>
  )
}

export default ProfileSidebar