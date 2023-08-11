"use client"

// Imports Components
import Feed from '@components/Feed'
import Sidebar from '@components/Sidebar/Sidebar'
import Loader from '@components/Loader'
import { infoUser } from '@utils/userContext'

export default function Home() {

  const {data} = infoUser()

  return data ? (
    <div className='home-container'>
      <Feed data={data} />
      <Sidebar info={data} />
    </div>
  ) : (
    <Loader />
  )
}
