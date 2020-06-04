import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Button, List } from 'antd'
import TodoList from '../TodoList'

const TodoListUI = (props) => {
    return (
        <div>
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Input
                    placeholder='Todo info'
                    value={props.inputValue}
                    style={{ width: '300px', marginRight: '10px' }}
                    onChange={props.handleInputChange}
                ></Input>
                <Button type="primary" onClick={props.handleBtnClick}>提交</Button>

            </div>
            <List
                style={{ marginTop: "10px", width: '300px' }}
                bordered
                dataSource={props.list}
                renderItem={(item, index) => (
                    <List.Item onClick={(index) => { props.handleItemDelete(index) }}>
                        {item}
                    </List.Item>
                )}
            />
        </div>
    )
}

// export default class TodoListUI extends Component {
//     render() {
//         return (
//             <div>
//                 <div style={{ marginTop: '10px', marginLeft: '10px' }}>
//                     <Input
//                         placeholder='Todo info'
//                         value={this.props.inputValue}
//                         style={{ width: '300px', marginRight: '10px' }}
//                         onChange={this.props.handleInputChange}
//                     ></Input>
//                     <Button type="primary" onClick={this.props.handleBtnClick}>提交</Button>

//                 </div>
//                 <List
//                     style={{ marginTop: "10px", width: '300px' }}
//                     bordered
//                     dataSource={this.props.list}
//                     renderItem={(item, index) => (
//                         <List.Item onClick={(index) => { this.props.handleItemDelete(index) }}>
//                             {item}
//                         </List.Item>
//                     )}
//                 />
//             </div>
//         )
//     }
// }

export default TodoListUI
