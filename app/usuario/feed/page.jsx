"use client"

// Imports Components
import Feed from '@components/Feed'
import Sidebar from '@components/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {

  const { data: session } = useSession()
  const [data, setData] = useState([])

  const getUser = async () => {
    const response = await fetch(`/api/user/${session?.user.id}`)
    const answer = await response.json()

    setData(answer)
  }

  useEffect(() => {
    if (session) {
      getUser()
    }
  }, [session])

  return (
    <div className='home-container'>
      <Feed data={data} />
      <Sidebar data={data} />
    </div>
  )
}
