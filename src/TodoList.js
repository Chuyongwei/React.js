import React, { Component } from 'react'
import store from './store'
import { getInputChangAction, getDeleteItemAction, getAddItemAction, initListAction } from './store/actionCreators'
import TodoListUI from './store/TodoListUI'
import axios from 'axios'


export default class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        this.handleStorechange = this.handleStorechange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleItemDelete = this.handleItemDelete.bind(this)
        store.subscribe(this.handleStorechange); //更新数据
    }

    render() {
        return (
        <TodoListUI 
        inputValue = {this.state.inputValue}
        list = {this.state.list}
        handleInputChange = {this.handleInputChange}
        handleBtnClick = {this.handleBtnClick}
        handleItemDelete = {this.handleItemDelete}
        />
        )
    }

    componentDidMount() {
        axios.get('/list.json').then((res)=>{
            const data = res.data
            const action = initListAction(data)
            store.dispatch(action)
            console.log(res)
        })
    }

    handleInputChange(e){
        const action=getInputChangAction(e.target.value)
        store.dispatch(action)
    }

    handleStorechange(){
        this.setState(store.getState())
    }

    handleItemDelete(index){
        const action= getDeleteItemAction(index)
        store.dispatch(action)
    }

    handleBtnClick(e){
        const action=getAddItemAction()
        store.dispatch(action)
    }
}
