import React, { useEffect, useState } from 'react'
import Questions from './Questions'

//REDUX store import
import {useSelector,useDispatch} from 'react-redux'
import { MoveNextQuestion, MovePrevQuestion } from '../Hooks/FetchQuestion';
import {PushAnswer} from '../Hooks/setResult';

import { Navigate } from 'react-router-dom'; //Nvaigator is used to navigate to different  components

function Quiz(){  
    const state=useSelector(state=>state); //we are getting the current state
    const {queue,trace}=useSelector(state=>state.questions);  
    const dispatch=useDispatch();
    const [check,setChecked]=useState(undefined); //to access/get value of check from useSelect function which contains the index of selected index
    const result=useSelector(state=>state.result.result); //this will store the result array from current state
    
    useEffect(()=>{
      //  console.log(result)
    })

    

    function onNext(){
        // console.log('on click next')
        if(trace<queue.length){
          /** increase the trace value by one using MoveNextAction */
             dispatch(MoveNextQuestion());
            if(result.length<=trace){ //push the index in result array only whne we visit a new question otherwise just update
                 //pushing the index of selected option in result array
              dispatch(PushAnswer(check));
            }
        }
        setChecked(undefined); //reset the value of check so that if we skip a question without answering,undefined is stored for it
    }
     
    function onPrev(){
        // console.log('on click prev')
        //Decrease the trace value by 1
        if(trace>0){
          dispatch(MovePrevQuestion());
        }
    }
    
    //this function is used to access the index of selected option from question by passing this function as a attribute
    function onChecked(check){
      // console.log(check)
      setChecked(check);
    }
   
    //Finished Exam after the last question,from here we will redirect to another component
    if(result.length && result.length>=queue.length){
      return <Navigate to={'/result'} replace="true"></Navigate>
    }

  return (
    <div className='container'>
           <h1 className='title text-light'>Quiz Application</h1>
           {/*Display questions */}
           <Questions onChecked={onChecked}></Questions>
           <div className='grid'>
             {trace >0 ? <button className='btn prev' onClick={onPrev}>Previous</button> : <div></div>}
            <button className='btn next' onClick={onNext}>Next</button> 
           </div>
    </div>
  )
}

export default Quiz;