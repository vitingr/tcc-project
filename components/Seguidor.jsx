import React from 'react'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'

const Seguidor = ({ content, message, handleClick }) => {
  return (
    <div className="follower-container">
      <div className="follower-left">
        <img src={content.foto} alt="Profile Photo" />
      </div>
      <div className="follower-border">
        <div className="follower-main">
          <h2>{content.nomeCompleto}</h2>
          <h4>{content.area} - {content.cargo_atual}</h4>
          <p>{content.seguidores} seguidores</p>
        </div>
        <div className="follower-right">
          <div onClick={() => handleClick(content._id)}>
            {message}
          </div>
          <IoEllipsisHorizontalSharp size={20} className="icon-cursor" />
        </div>
      </div>
    </div>
  )
}

export default Seguidor