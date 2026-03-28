import { Star, Award, TrendingUp, Users } from 'lucide-react'
import React, { useRef, useState } from 'react'
import './header.less'

function Header({
	avatar,
	name,
	description,
	rating,
	stats = [],
}: {
	avatar?: string
	name: string
	description: string
	rating: number
	stats?: Array<{
		label: string
		value: string | number
		icon?: React.ReactNode
	}>
}) {
	const scrollRef = useRef<HTMLDivElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	// дефаултные статы, омжно убрать 
	const defaultStats = [
		{ label: 'RATING', value: rating, icon: <Star size={14} /> },
		{ label: 'FOLLOWERS', value: '1.2K', icon: <Users size={14} /> },
		{ label: 'TRENDS', value: '+24%', icon: <TrendingUp size={14} /> },
		{ label: 'ACHIEVEMENTS', value: '8', icon: <Award size={14} /> },
	]

	const displayStats = stats.length > 0 ? stats : defaultStats

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!scrollRef.current) return
		setIsDragging(true)
		setStartX(e.pageX - scrollRef.current.offsetLeft)
		setScrollLeft(scrollRef.current.scrollLeft)
		scrollRef.current.style.cursor = 'grabbing'
		scrollRef.current.style.userSelect = 'none'
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || !scrollRef.current) return
		e.preventDefault()
		const x = e.pageX - scrollRef.current.offsetLeft
		const walk = (x - startX) * 1.5 // спид скролла
		scrollRef.current.scrollLeft = scrollLeft - walk
	}

	const handleMouseUp = () => {
		if (!scrollRef.current) return
		setIsDragging(false)
		scrollRef.current.style.cursor = 'grab'
		scrollRef.current.style.userSelect = 'auto'
	}

	const handleMouseLeave = () => {
		if (isDragging) {
			handleMouseUp()
		}
	}

	return (
		<section className='profile-header'>
			<div className='profile-user'>
				<img
					src={avatar || '/public/default-user.png'}
					alt='Avatar'
					className='avatar'
				/>
				<div className='user-info'>
					<h1 className='user-name'>{name}</h1>
					<p className='user-bio'>{description}</p>
				</div>
			</div>

			<div
				className='stats-row'
				ref={scrollRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseLeave}
				style={{ cursor: 'grab' }}
			>
				{displayStats.map((stat, index) => (
					<div key={index} className='stat-item'>
						<div className='stat-content'>
							{stat.icon && <span className='stat-icon'>{stat.icon}</span>}
							<span className='stat-value'>{stat.value}</span>
						</div>
						<p className='stat-label'>{stat.label}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Header
