import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button,List } from 'antd'
import store from './store'
import {ADD_TODO_ITEM,DELETE_TODO_ITEM,CHANGE_INPUT_VALUE} from './store/actionType'
import { getInputChangAction, getDeleteItemAction, getAddItemAction } from './store/actionCreators'



export default class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = store.getState()
        this.handleStorechange = this.handleStorechange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        store.subscribe(this.handleStorechange); //更新数据
    }

    render() {
        return (
            <div>
                <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                    <Input 
                    placeholder='Todo infop' 
                    value={this.state.inputValue} 
                    style={{ width: '300px' }}
                    onChange={this.handleInputChange}
                    ></Input>
                    <Button type="primary" onClick={this.handleBtnClick}>提交</Button>

                </div>
                <List
                style={{marginLeft: "klsadf"}}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item,index) => (
                        <List.Item onClick={this.handleItemDelete.bind(this,index)}>
                            {item}
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    handleInputChange(e){
        const action=getInputChangAction()
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
