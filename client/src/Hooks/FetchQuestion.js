//Here we will create a custom hook to fetch api data and set value to store

import { useEffect, useState } from "react"
// import data, { answers } from "../database/data";
import { useDispatch } from "react-redux";

//REDUX ACTIONS
import * as Action from '../redux/question_reducer'  //* means importing all the modules
import { getServerData } from "../helper/helper";

function useFetchQuestion(){
   const [getdata,setGetData]=useState({isLoading : false,apiData : [],serverError : null});
   const dispatch=useDispatch();  //disptach variable will be a function, It returns a reference to the dispatch function provided by the Redux store. This function is used to dispatch actions to the Redux store.

    //Async function to fetch data from backend
    //we are using async function bcz fectching data from API/backend is a time taking task and meanwhile javaScript should not block excution of other code
    async function fun(){
         try {
            // let questions =await data; //The data variable should be a promise or an asynchronous operation that returns a promise. When you await it, the function will pause and wait for the promise to resolve. Once the promise is resolved, the result will be assigned to the question variable.
            const [{questions,answers}]=await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data);
            //  const q = await getServerData('http://localhost:5000/api/questions', (data) => data)
            //   console.log(process.env.REACT_APP_SERVER_HOSTNAME);
            //  console.log({questions,answers})
             if(questions.length>0){ //this means data is fetched
                setGetData(prev=>({...prev,isLoading : false}))
                setGetData(prev=>({...prev,apiData : {questions,answers}}))
                //Dispatching an action
                dispatch(Action.startExamAction({question : questions,answers : answers})) //Action.startExamAction(question) creates an action object,This action object typically has a type property that describes the action and an optional payload property containing data associated with the action
            }
            else{
                throw new Error("No Question available")
            }
        } catch (error) {
            setGetData(prev=>({...prev,isLoading : false})) //setting isloading to false signals that loading process has stopped due to ecncounter of an error
            setGetData(prev=>({...prev,serverError : error})) //signaling that error has been occured
        }
    }

    useEffect(()=>{    //we are using useEffect bcz fecthing api data is a side service and we use useEffect for side services and it also makes easy catching the errors
        setGetData(prev=>({...prev,isLoading : true}))  //we are setting isLoading to true before making API Call and we will updtae it to false when data is fetched or a error occurs
        fun(); //calling the async function
    },[dispatch]);
    
  return [getdata,setGetData];
}

//moveAction dispatch function
export function MoveNextQuestion(){
    return async function(dispatch){ //we are returning other function so that we can use useDispatch here also as useDispatch is a hook and can be used inside a hook only
        try {
            dispatch(Action.moveNextAction());
        } catch (error) {
            console.log(error);
        }
    }
}

//prevAction dispatch function
export function MovePrevQuestion(){
    return async function(dispatch){ //we are returning other function so that we can use useDispatch here also as useDispatch is a hook and can be used inside a hook only
        try {
            dispatch(Action.movePrevAction());
        } catch (error) {
            console.log(error);
        }
    }
}

export default useFetchQuestion;