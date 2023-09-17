"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { infoUser } from '@utils/userContext'
import { useSession } from 'next-auth/react'
import Loader from '@components/Others/Loader'
import Sidebar from '@components/Sidebar/Sidebar'
import SearchUser from '@components/Search/SearchUser'
import SearchPage from '@components/Search/SearchPage'
import SearchPost from '@components/Search/SearchPost'
import SearchJob from '@components/Search/SearchJob'

const page = () => {

  const { data: session } = useSession()
  const { data } = infoUser()
  const pathname = usePathname().split("/")
  const query = pathname[3]

  const [users, setUsers] = useState([])
  const [pages, setPages] = useState([])
  const [posts, setPosts] = useState([])
  const [jobs, setJobs] = useState([])

  const fetchData = async () => {
    try {
      const result1 = await fetch(`/api/search/users/${query}`)
      const response1 = await result1.json()
      setUsers(response1.slice(0, 3))

      const result2 = await fetch(`/api/search/pages/${query}`)
      const response2 = await result2.json()
      setPages(response2.slice(0, 3))

      const result3 = await fetch(`/api/search/posts/${query}`)
      const response3 = await result3.json()
      setPosts(response3.slice(0, 3))

      const result4 = await fetch(`/api/search/jobs/${query}`)
      const response4 = await result4.json()
      setJobs(response4.slice(0, 3))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session && data._id !== undefined) {
      fetchData()
    }
  }, [session, data])

  return data ? (
    <div className='search-container'>
      <div className='search-items-container'>
        <div className='search-item-container'>
          <h1 className='search-title'>Pessoas</h1>
          {users.length > 0 ? (
            <>
              {users.map((user) => (
                <SearchUser data={user} />
              ))}
              <div className='search-see-more'>
                Descobrir mais pessoas
              </div>
            </>
          ) : (
            <>
              <h1 className='search-error'>Ops... não encontramos nada relacionado</h1>
            </>
          )}
        </div>

        <div className='search-item-container'>
          <h1 className='search-title'>Páginas</h1>
          {pages.length > 0 ? (
            <>
              {pages.map((page) => (
                <SearchPage data={page} />
              ))}
              <div className='search-see-more'>
                Descobrir mais páginas
              </div>
            </>
          ) : (
            <>
              <h1 className='search-error'>Ops! não encontramos nada relacionado...</h1>
            </>
          )}
        </div>

        <div className='search-item-container'>
          <h1 className='search-title'>Postagens</h1>
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <SearchPost data={post} />
              ))}
              <div className='search-see-more'>
                Ver mais postagens
              </div>
            </>
          ) : (
            <>
              <h1 className='search-error'>Ops... não encontramos nada relacionado</h1>
            </>
          )}
        </div>

        <div className='search-item-container'>
          <h1 className='search-title'>Vagas de Emprego</h1>
          {jobs.length > 0 ? (
            <>
              {jobs.map((job) => (
                <SearchJob data={job} />
              ))}
              <div className='search-see-more'>
                Ver mais vagas
              </div>
            </>
          ) : (
            <>
              <h1 className='search-error'>Ops... não encontramos nada relacionado</h1>
            </>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  ) : (
    <Loader />
  )
}

export default page