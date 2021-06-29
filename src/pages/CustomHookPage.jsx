import React, { useEffect, useState } from 'react'

export default function CustomGookPage() {

	const [count,setCount] = useState(0)
	useEffect(()=>{
		console.log("effect");
		// 只需要在count值改变时执行
		document.title = `点击了${count}次`
	},[count])//依赖项,这里依赖count

	return (
		<div>
			<h3>CustomGookPage</h3>
			<p>{count}</p>
			<button onClick={()=>{setCount(count+1)}}>add</button>
			<p>{useClock().toLocaleTimeString()}</p>
		</div>
	)
}

function useClock(){
	//设置count为0
	const [date,setDate] = useState(new Date())
	//  和didMount,didUpdate类似

	useEffect(()=>{
				// 只需要在didMount时改变
				const timer = setInterval(()=>{
					setDate(new Date())
				},1000)
				//清除定时器,相当于willUnmount
				return ()=>{clearInterval(timer)}
	},[])
	return date
}