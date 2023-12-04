"use client"

// Imports React
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineHeart } from 'react-icons/ai'
import { BsPeople } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

// Imports NextAuth
import { signOut, useSession } from "next-auth/react"

// Imports Icons
import { IoSearchOutline, IoHomeSharp, IoGitNetwork, IoBriefcaseSharp, IoNotifications, IoSettingsSharp, IoExit, IoNewspaper, IoMenuSharp, IoBusinessOutline, IoPeopleSharp, IoPencilOutline, IoThumbsUpSharp, IoPodiumSharp } from 'react-icons/io5'
import { infoUser } from '@utils/userContext'

const Navbar = () => {

	const { data: session } = useSession()
	const { data, getInfo, premiumInfo } = infoUser()
	const router = useRouter()

	const [searchText, setSearchText] = useState("")
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// const search = async (e) => {
	// 	e.preventDefault()
	// 	const query = searchText.replace(" ", "-")
	// 	router.push(`/usuario/search/${query}`)
	// }

	const driverObj = driver({
		showProgress: true,
		popoverClass: 'driverjs-theme',
		steps: [
			// { element: '#home', popover: { title: 'Conheça nosso menu', description: 'Apresentaremos a você todas as funcionalidades de nosso site! Esperamos que você goste e aproveite ao máximo', side: "left", align: 'start' } },
			{ element: '#home', popover: { title: 'Menu Inicial', description: 'Esse é o nosso menu inicial, aqui você pode ver as mais recentes postagens, vagas de emprego, e algumas informações pessoais básicas.', side: "left", align: 'start' } },
			{ element: '#network', popover: { title: 'Sua rede de Amigos', description: 'Aqui é possível consultar as suas conexões e amizades realizadas dentro de nossa plataforma', side: "bottom", align: 'start' } },
			{ element: '#jobs', popover: { title: 'Vagas de Emprego', description: 'Aqui você pode buscar uma vaga específica explorar e encontrar as oportunidades que mais se assemelham ao seu perfil profissional!', side: "bottom", align: 'start' } },
			{ element: '#notifications', popover: { title: 'Suas notificações', description: 'Veja quem enviou um convite de conexão ou qual amigo realizou alguma publicação recente.', side: "bottom", align: 'start' } },
			{ element: '#settings', popover: { title: 'Configurações', description: 'Aqui você ver suas informações, alterar configurações visuais e recursos de acessibilidade, e muito mais referente a customização!', side: "bottom", align: 'start' } },
			{ element: '#news', popover: { title: 'Notícias e Artigos', description: 'Aqui você pode conferir as notícias do momento, além de alguns artigos e dicas relacionados com o mercado de trabalho para mulheres, além de treinamentos extremamente úteis para impulsionar a sua carreira profissional.', side: "right", align: 'start' } },
			{ popover: { title: 'Desfrute ao máximo!', description: 'E é isso! Explore as mais diversas variedades de pratos e restaurantes, desejamos uma boa experiência.' } }
		]
	})

	const viewMenu = async () => {
		try {
			const response = await fetch("/api/user/SeeDriver", {
				method: "POST",
				body: JSON.stringify({
					userId: data._id
				})
			})
			console.log(response)
			if (response.ok) {
				console.log("Perfil visto")
				getInfo()
			} else {
				console.log("erro")
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (data._id !== undefined && data.novoUsuario === 1) {
			if (data.cargo_atual != "" || data.ultima_empresa != "" || data.ultimo_contrato != "" || data.area != "" || data.procurando_emprego != "" && status != "authenticated") {
				viewMenu()
				driverObj.drive()
			}
		}
	}, [data])

	return (
		<header className='header'>
			{session?.user ? (
				<nav className='navbar' id="navbar">
					<div className="profile-photo-navbar-sm">
						<Link href="/usuario/profile">
							<div className='center'>
								<img src={data.foto} className='very-small-rounded-photo scale-transform' alt='photo' />
							</div>
						</Link>
					</div>

					<div className='search-container'>
						{/* <Link href="/usuario/feed">
							<img src="https://www.brandbucket.com/sites/default/files/logo_uploads/464455/large_alpworks.png" alt="logo" className='search-logo' />
						</Link> */}
						<form className='search-content'>
							<div className='search-content'>
								<Link href={`/usuario/search/${searchText}`}>
									<div className='icon-cursor center'>
										<IoSearchOutline size={22.5} />
									</div>
								</Link>
								<input type="text" id="search-items" name="search-items" placeholder='Buscar' onChange={(e) => setSearchText(e.target.value)} required />
							</div>
						</form>
					</div>   

					<div className='nav-content'>
						<ul className='nav-list'>
							<li id='home'>
								<Link href="/usuario/feed" className='link-nav center'>
									<div><IoHomeSharp size={17.5} /></div>
									<p>Início</p>
								</Link>
							</li>
							<li id='network'>
								<Link href="/usuario/amigos" className='link-nav center'>
									<div><IoGitNetwork size={17.5} /></div>
									<p>Network</p>
								</Link>
							</li>
							<li id='jobs'>
								<Link href="/usuario/empregos" className='link-nav center'>
									<div><IoBriefcaseSharp size={17.5} /></div>
									<p>Emprego</p>
								</Link>
							</li>
							<li id='notifications'>
								<Link href="/usuario/notificacoes" className='link-nav center'>
									<div><IoNotifications size={17.5} /></div>
									<p>Notif.</p>
									<div className="qtd-notificacoes">
										{data.notificacoes}
									</div>
								</Link>
							</li>
							<li className="settings" id='settings'>
								<Link href="/usuario/settings" className='link-nav center'>
									<div><IoSettingsSharp size={17.5} /></div>
									<p>Settings</p>
								</Link>
							</li>
							<li id='news'>
								<Link href="#" className='link-nav center'>
									<div><IoNewspaper size={17.5} /></div>
									<p>News</p>
								</Link>
							</li>
						</ul>
					</div>

					<div className='actions-navbar center'>
						<Link href="/usuario/profile">
							<div className='center'>
								<img src={data.foto} className='very-small-rounded-photo scale-transform' alt='photo' />
							</div>
						</Link>
						<div className='sign-out center icon-cursor' onClick={signOut}>
							Sign Out
						</div>
					</div>

					<div className='menu-navbar' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<IoMenuSharp size={30} />
					</div>

					{isMenuOpen ? (
						<div className='home-profile-menu'>
							<div className='photo-home-profile-menu center' />
							<div className='info-home-profile-menu'>
								<div className='home-basic-info-menu'>
									<Link href="/usuario/profile">
										<h2>Olá {data.nomeCompleto}</h2>
									</Link>
									<p>{data.email}</p>
								</div>
								<div className='home-friends-menu'>
									<div>
										<Link href="/usuario/amigos">
											<h4>Amizades</h4>
											<p>Adicione amigos</p>
										</Link>
									</div>
									<div className='center'>
										<Link href={`/usuario/seguidores/${data._id}`}>
											<span className="feed-friends">{data.seguidores}</span>
										</Link>
									</div>
								</div>
								<div className='home-options-menu'>
									<Link href="/usuario/amigos" onClick={() => setIsMenuOpen(!isMenuOpen)}>
										<li className='icon-cursor'>
											<div className='center'><BsPeople size={22.5} /></div>
											<div>Ver amizades</div>
										</li>
									</Link>
									<Link href="/empresa" onClick={() => setIsMenuOpen(!isMenuOpen)}>
										<li className='icon-cursor'>
											<div className='center'><IoBusinessOutline size={22.5} /></div>
											<div>Conta Empresarial</div>
										</li>
									</Link>
									<Link href="/usuario/profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
										<li className='icon-cursor'>
											<div className='center'><IoSettingsOutline size={22.5} /></div>
											<div>Editar perfil</div>
										</li>
									</Link>
									<li className='icon-cursor' onClick={() => setIsMenuOpen(!isMenuOpen)}>
										<div className='center'><AiOutlineHeart size={22.5} /></div>
										<div>Minhas curtidas</div>
									</li>
									<li className='icon-cursor' onClick={() => setIsMenuOpen(!isMenuOpen)}>
										<div className='center'><AiOutlineBarChart size={22.5} /></div>
										<div className='center'>Atividade perfil</div>
									</li>
									<li className='icon-cursor' onClick={() => signOut()}>
										<div className='center'><VscSignOut size={22.5} /></div>
										<div className='center'>Sair</div>
									</li>
								</div>
							</div>
						</div>
					) : (<></>)}

				</nav>
			) : (
				<></>
			)}
		</header>
	)
}

export default Navbar