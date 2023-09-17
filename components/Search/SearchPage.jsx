import HtmlContent from '@components/Others/HtmlContent'
import React from 'react'

const SearchPage = ({ data }) => {
  return (
    <div className='search-option'>
      <div className='search-option-photo'>
        <img src={data.foto} alt="Profile Photo" />
      </div>
      <div className='search-option-info descricao-option'>
        <h1>{data.nome}</h1>
        <h4>{data.industria}</h4>
        <h5>{data.descricao}</h5>
      </div>
      <div className='search-option-action'>
        <div>Seguir</div>
      </div>
    </div>
  )
}

export default SearchPage