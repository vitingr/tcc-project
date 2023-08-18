import React from 'react'
import Image from 'next/image'
import JobSidebar from './JobSidebar'

// Imports React
import { IoAlertCircleOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

const JobsSidebar = () => {

  const { data: session } = useSession()
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/pageOptions/${session?.user.id}`)
      const response = await result.json()
      setData(response)
    }
    if (session) {
      fetchData()
    }
  }, [session])

  return (
    <div className='menu-sidebar-container'>
      <div className='top-sidebar'>
        <h3>
          Vagas de Emprego
        </h3>
        <IoAlertCircleOutline size={17.5} className='icon-cursor' />
      </div>
      {data ? (
        <div className='jobs-sidebar-container'>
          {data.map((vaga) => (
            <JobSidebar key={vaga._id} image={vaga.foto} name={vaga.cargo} minSalary={vaga.salario} maxSalary={vaga.salario} />
          ))}
        </div>
      ) : (
        <></>
      )}
      <div className='center'>
        <button className="cta icon-cursor">
          <span>Ver mais</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default JobsSidebar