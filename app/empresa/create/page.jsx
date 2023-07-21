"use client"

import { infoUser } from '@utils/userContext'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const page = () => {

	const { data } = infoUser()
	const router = useRouter()

	useEffect(() => {
		if (data) {
			if (data.tipoConta == "instituicao" || data.tipoConta == "empresarial") {
				router.push("/empresa")
			} else {
				console.log("Conta não Empresarial")
			}
		}
	}, [data])

	return (
		<div className='choose-company-type-container'>
			<div className='title-create-company center'>
				<h1>Criar Empresa ou Instituição</h1>
				<h5>
					Divulgar sua empresa ou instituição é de extrema importância, aumentar a visibilidade da marca e impulsionar o crescimento dos negócios.
				</h5>
			</div>
			<div className='company-types'>

				<Link href="/empresa/createCompany">
					<div className='company-option'>
						<div className='top-company-option'>
							<img src="/assets/images/company.svg" alt="Foto Empresa" />
						</div>
						<div className='main-company-option center'>
							<div className='content-company-option'>
								<p>
									Uma empresa é uma organização constituída por indivíduos com objetivos em comum.
								</p>
							</div>
							<div className='create-company-option'>
								Criar Empresa
							</div>
						</div>
					</div>
				</Link>

				<Link href="/empresa/createInstituition">
					<div className='company-option'>
						<div className='top-company-option'>
							<img src="/assets/images/instituition.svg" alt="Foto Instituição" />
						</div>
						<div className='main-company-option center'>
							<div className='content-company-option'>
								<p>
									Uma instituiçao de ensino possui como objetivo espalhar o conhecimento
								</p>
							</div>
							<div className='create-company-option'>
								Criar Instituição
							</div>
						</div>
					</div>
				</Link>
			</div>
			<div className='image-create-company center'>
				<img src="/assets/images/create-company.svg" alt="Create a Company" />
			</div>
		</div>
	)
}

export default page