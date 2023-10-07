import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const JobSidebar = ({ image, name, minSalary, maxSalary }) => {
	return (
		<Link href={"/usuario/empregos"}>
			<div className='sidebar-jobs-opportunities'>
				<div className='logo-job-opportunity'>
					<img src={image} alt='photo' />
				</div>
				<div className='info-job-opportunity'>
					<h3>{name}</h3>
					<p>{maxSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/mês</p>
				</div>
			</div>
		</Link>
	)
}

export default JobSidebar