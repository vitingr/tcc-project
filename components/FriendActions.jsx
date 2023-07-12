import React from 'react'
import Link from 'next/link'
import { IoPeopleSharp, IoDocumentTextSharp, IoSearchSharp, IoRocketSharp, IoPersonAddSharp, IoMailSharp } from 'react-icons/io5'

const FriendActions = () => {
  return (
    <div className='friends-actions-container'>
      <h3>Gerenciar minhas conexões</h3>
      <div className='friends-actions'>
        <Link href="/usuario/amigos">
          <div className='friend-action icon-cursor'>
            <IoPeopleSharp size={17} className='friend-action-icon' />
            <p>Meus Amigos</p>
          </div>
        </Link>
        <Link href="/usuario/">
          <div className='friend-action icon-cursor'>
            <IoDocumentTextSharp size={17} className='friend-action-icon' />
            <p>Páginas Seguidas</p>
          </div>
        </Link>
        <Link href="/usuario/amigos/adicionarAmigos">
          <div className='friend-action icon-cursor'>
            <IoSearchSharp size={17} className='friend-action-icon' />
            <p>Encontrar Amigos</p>
          </div>
        </Link>
        <Link href="/usuario/">
          <div className='friend-action icon-cursor'>
            <IoRocketSharp size={17} className='friend-action-icon' />
            <p>Encontrar Páginas</p>
          </div>
        </Link>
        <Link href="/usuario/amigos/amigosPendentes">
          <div className='friend-action icon-cursor'>
            <IoPersonAddSharp size={17} className='friend-action-icon' />
            <p>Convites Pendentes</p>
          </div>
        </Link>
        <Link href="/usuario/amigos/convitesEnviados">
          <div className='friend-action icon-cursor'>
            <IoMailSharp size={17} className='friend-action-icon' />
            <p>Convites Enviados</p>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default FriendActions