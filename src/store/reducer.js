import {ADD_TODO_ITEM,CHANGE_INPUT_VALUE,DELETE_TODO_ITEM, INIT_LIST_ITEM} from './actionType'

const defaultState = {
    inputValue: '123',
    list:[1,2,3]
}

//reducer可以接受state不能修改state
//纯函数指的是，给固定的输入，就一定会有固定的输出，而且不会有任何副作用
export default (state = defaultState,action) => {
    if(action.type===CHANGE_INPUT_VALUE){
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }
    if(action.type===ADD_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue =''
        return newState
    }

    if(action.type===DELETE_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index,1);
        return newState
    }
    if(action.type===INIT_LIST_ITEM){
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data;
        return newState
    }
    // console.log(state,action)
    return state;
} 
