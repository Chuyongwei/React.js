import React, { useEffect, useState } from 'react'

export default function FunctionComponent() {
	const [date,setDate] = useState(new Date())
	useEffect(()=>{
		const timer = setInterval(()=>{
			setDate(new Date())
		},1000)
		return ()=>clearInterval(timer)
	},[])	// 检查若有变化就执行

	return (
		<div>
			<h3>FunctionComponent</h3>
			<div>{date.toLocaleTimeString()}</div>
		</div>
	)
}
