import Link from 'next/link'
import React from 'react'
import { IoPersonAddSharp } from 'react-icons/io5'

const FriendOptionSidebar = ({ content }) => {
  return (
    <Link href={`/usuario/user/${content._id}`}>
      <div className="sidebar-friends-option-container">
        <div className="sidebar-friend-left">
          <img src={content.foto} alt="profile photo" className="small-rounded-photo" />
        </div>
        <div className="sidebar-friend-main">
          <h1>{content.nomeCompleto}</h1>
          {content.area !== "" ? (
            <p>
              {content.cargo_atual} - {content.ultima_empresa}
            </p>
          ) : (
            <p>
              Usuário da plataforma - procurando oportunidades
            </p>
          )}
          <p></p>
        </div>
        <div className="sidebar-friend-right">
          <IoPersonAddSharp size={16} />
        </div>
      </div>
    </Link>
  )
}

export default FriendOptionSidebar