import React, {  useState } from 'react'
import ReactReduxPage from './ReactReduxPage';

export default function Index() {
	const [num, setNum] = useState(0);
	return (
		<div className="App">
			<button onClick={()=>setNum(num+1)}>change num {num}</button>
			<ReactReduxPage msg={num}/>
		</div>
	);
}
