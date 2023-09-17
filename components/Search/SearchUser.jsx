import React from 'react'

const SearchUser = ({ data }) => {
  return (
    <div className='search-user'>
      <div className='search-user-photo'>
        <img src={data.foto} alt="Profile Photo" />
      </div>
      <div className='search-user-info'>
        <h1>{data.nomeCompleto}</h1>
        <h4>{data.area} - {data.ultima_empresa}</h4>
        <h5>{data.seguidores} conexões</h5>
      </div>
      <div className='search-user-action'>
        <div>Adicionar</div>
      </div>
    </div>
  )
}

export default SearchUser