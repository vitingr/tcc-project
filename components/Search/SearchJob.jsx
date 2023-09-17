import React from 'react'

const SearchJob = ({ data }) => {
  return (
    <div className='search-option'>
      <div className='search-option-photo'>
        <img src={data.foto} alt="Profile Photo" />
      </div>
      <div className='search-option-info descricao-option'>
        <h1>{data.cargo}</h1>
        <h4>{data.nomeEmpresa}</h4>
        <h5>{data.local} ({data.tipo})</h5>
      </div>
      <div className='search-option-action'>
        <div>Candidatar</div>
      </div>
    </div>
  )
}

export default SearchJob