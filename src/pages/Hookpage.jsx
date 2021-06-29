import React, { useEffect, useState } from 'react'

export default function Hookpage(props) {
	//设置count为0
	const [count,setCount] = useState(0)
	const [date,setDate] = useState(new Date())
	//  和didMount,didUpdate类似
	useEffect(()=>{
		console.log("effect");
		// 只需要在count值改变时执行
		document.title = `点击了${count}次`
	},[count])//依赖项,这里依赖count
	useEffect(()=>{
				// 只需要在didMount时改变
				const timer = setInterval(()=>{
					setDate(new Date())
				},1000)
				//清除定时器,相当于willUnmount
				return ()=>{clearInterval(timer)}
	},[])
	return (
		<div>
			<h3>Hookpage</h3>
			<p>{count}</p>
			<button onClick={()=>{setCount(count+1)}}>add</button>
			<p>{date.toLocaleTimeString()}</p>
		</div>
	)
}
