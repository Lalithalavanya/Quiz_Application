import {combineReducers,configureStore} from '@reduxjs/toolkit'

/*CALL REDUCERS*/
import questionReducer from './question_reducer'
import resultReducer from './result_reducer'

//This will return the CENTRAL STORE 
const rootReducer=combineReducers({
    questions : questionReducer,
    result : resultReducer
})


export default configureStore({reducer : rootReducer})