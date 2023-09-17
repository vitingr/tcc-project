import React from 'react'

const SearchUser = ({ data }) => {
  return (
    <div className='search-option'>
      <div className='search-option-photo'>
        <img src={data.foto} alt="Profile Photo" />
      </div>
      <div className='search-option-info'>
        <h1>{data.nomeCompleto}</h1>
        <h4>{data.area} - {data.ultima_empresa}</h4>
        <h5>{data.seguidores} conexões</h5>
      </div>
      <div className='search-option-action'>
        <div>Adicionar</div>
      </div>
    </div>
  )
}

export default SearchUser