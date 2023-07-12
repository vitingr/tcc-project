import React from 'react'
import Image from 'next/image'

const JobSidebar = ({ image, name, minSalary, maxSalary }) => {
    return (
        <div className='sidebar-jobs-opportunities'>
            <div className='logo-job-opportunity'>
                <Image src={image} width={1000} height={1000} alt='photo' />
            </div>
            <div className='info-job-opportunity'>
                <h3>{name}</h3>
                <p>$${minSalary}/mês - R${maxSalary}/mês</p>
            </div>
        </div>
    )
}

export default JobSidebar