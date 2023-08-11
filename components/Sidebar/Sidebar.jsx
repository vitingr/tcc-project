"use client"

import React from 'react'

// Imports Components
import FriendsSidebar from './FriendsSidebar'
import JobsSidebar from './JobsSidebar'
import NewsSidebar from './NewsSidebar'
import { infoUser } from '@utils/userContext'

const Sidebar = ({ info }) => {

  const { data } = infoUser()

  return (
    <div className='sidebar-container'>
      {data ? (
        <div className='offer-premium'>
          <div className='offer-premium-top'>
            <p>
              Acesso a ferramentas e recursos exclusivos
            </p>
          </div>
          <div className='offer-premium-main'>
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/630px-New_Power_BI_Logo.svg.png" alt="logo-premium" />
            </div>
            <div>
              <p>Tenha mais visibilidade. Experimente o Premium por 30 dias grátis</p>
            </div>
          </div>
          <div className='offer-premium-bottom icon-cursor'>
            Experimentar
          </div>
        </div>
      ) : (
        <></>
      )}
      <JobsSidebar />
      <NewsSidebar />
      <FriendsSidebar />
    </div>
  )
}

export default Sidebar