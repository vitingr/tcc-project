import React from 'react'

// Imports Components
import FriendsSidebar from './FriendsSidebar'
import JobsSidebar from './JobsSidebar'
import NewsSidebar from './NewsSidebar'

const Sidebar = ({ data }) => {
  return (
    <div className='sidebar-container'>
      <JobsSidebar />
      <NewsSidebar />
      <FriendsSidebar />
    </div>
  )
}

export default Sidebar