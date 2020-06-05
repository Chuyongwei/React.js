import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";
import { GET_INIT_LIST } from './actionType'
import { initListAction } from './actionCreators';
import store from '.';

function* getInitList() {
    try{
        const res = yield axios.get('./list.json')
        const action = initListAction(res.data)
        yield put(action)
    }catch(e){
        console.log("list.json网路请求失败")
    }
    // axios.get('/list.json').then((res) => {
    //     const data = res.data
    //     const action = initListAction(data)
    //     put(action);
    // })
}

function* mySage() {
    yield takeEvery(GET_INIT_LIST, getInitList)
}

export default mySage