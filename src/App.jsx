import React, { useState } from 'react'
import ClassComponent from './pages/ClassComponent'
import CustomHookPage from './pages/CustomHookPage';
import FunctionComponent from './pages/FunctionComponent'
import HomePage from './pages/HomePage'
import Hookpage from './pages/Hookpage'
import LifeCyclePage from './pages/LifeCyclePage'
import PureComponentPage from './pages/PureComponentPage'
import ReactReduxPage from './pages/ReactReduxPage'
import ReduxPages from './pages/ReduxPages'
import RouterPage from './pages/RouterPage'
import SetSatePage from './pages/SetSatePage'

export default function App() {
	return (
		<div>
			{/* <ClassComponent></ClassComponent> */}
			{/* <FunctionComponent></FunctionComponent> */}
			{/* <SetSatePage></SetSatePage> */}
			{/* <LifeCyclePage></LifeCyclePage> */}
			{/* <HomePage/> */}
			{/* <ReduxPages/> */}
			{/* <ReactReduxPage/> */}
			{/* <RouterPage/> */}
			{/* <PureComponentPage/> */}
			<Hookpage/>
			<CustomHookPage/>
		</div>
	)
}
