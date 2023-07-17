"use client"

import React from 'react'
import Popup from '@components/Popup'

const EditProfile = ({ data, handleClick }) => {

  return (
    <Popup title={"Editar Perfil"} subtitle={"Edite seu perfil para atrair novos usuários e impulsionar a sua rede de networking"} handleClick={handleClick}>
      <div className='edit-profile-container'>
        <form>
          <div className='input-add-container'>
            <p>Nome</p>
            <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Natura LTDA.' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setEmpresa(e.target.value)} value={data.nome} required />
          </div>
          <div className='input-add-container'>
            <p>Sobrenome</p>
            <input type="text" name="empresa" id="add-input" className='add-input' placeholder='ex: Natura LTDA.' autoComplete='off' maxLength={35} minLength={4} onChange={(e) => setEmpresa(e.target.value)} value={data.sobrenome} required />
          </div>
          <div>
            
          </div>
        </form>
      </div>
    </Popup>
  )
}

export default EditProfile