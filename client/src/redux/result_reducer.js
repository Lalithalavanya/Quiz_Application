import { CreateSlice, createSlice } from "@reduxjs/toolkit"


export const resultReducer=createSlice({
    name : 'result',
    initialState :{
        userId :null,
        result : []
    },
    reducers : {
        setUserId : (state,action)=>{
            state.userId=action.payload
        },
        pushResultAction : (state,action)=>{ //Action to push index of selected option in the result array
            state.result.push(action.payload)
        },
        resetResultAction : ()=>{  //Action to reset the result array on clicking Restart button in result component
            return {
                userId :null,
                result : []
            }
        },
        updateResultAction : (state,action)=>{
            const {trace,checked}=action.payload;
            state.result.fill(checked,trace,trace+1)
        }
    }
})

export const {setUserId,pushResultAction,resetResultAction,updateResultAction}=resultReducer.actions;

export default resultReducer.reducer;