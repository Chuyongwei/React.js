import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ITEM } from "./actionType";
import axios from "axios";

export const getInputChangAction= (value) =>({
    type: CHANGE_INPUT_VALUE,
    value
})

export const getAddItemAction = () =>({
    type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index)=>({
    type:DELETE_TODO_ITEM,
    index
})

export const initListAction = (data)=>({
    type:INIT_LIST_ITEM,
    data
})

export const getTodoList = () =>{
    return (dispatch) =>{
        axios.get('/list.json').then((res)=>{
            const data = res.data
            const action = initListAction(data)
            dispatch(action)
            // console.log(data)
            // const action = initListAction(data)
            // store.dispatch(action)
        })
    }
}