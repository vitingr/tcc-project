import React from 'react'
import Image from 'next/image'
import JobSidebar from './JobSidebar'

// Imports React
import { IoAlertCircleOutline } from 'react-icons/io5'

const JobsSidebar = () => {
  return (
    <div className='menu-sidebar-container'>
      <div className='top-sidebar'>
        <h3>
          Vagas de Emprego
        </h3>
        <IoAlertCircleOutline size={17.5} className='icon-cursor' />
      </div>
      <div className='jobs-sidebar-container'>
        <JobSidebar image={"/assets/images/natura.png"} name={"Natura Co."} minSalary={2.600} maxSalary={5.200} />
        <JobSidebar image={"/assets/images/natura.png"} name={"Natura Co."} minSalary={2.600} maxSalary={5.200} />
        <JobSidebar image={"/assets/images/natura.png"} name={"Natura Co."} minSalary={2.600} maxSalary={5.200} />
        <JobSidebar image={"/assets/images/natura.png"} name={"Natura Co."} minSalary={2.600} maxSalary={5.200} />
      </div>
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