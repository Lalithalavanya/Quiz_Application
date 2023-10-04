import React, {useEffect, useState } from 'react'
// import data from '../database/data';

//custoom hook
import useFetchQuestion from '../Hooks/FetchQuestion';
import { useDispatch, useSelector } from 'react-redux';
import { updateResultAction } from '../redux/result_reducer';
import { updateResult } from '../Hooks/setResult';


function Questions({onChecked}){
  const state=useSelector(state => state);
    const [checked,setChecked]=useState(undefined); //checked will store the index of selected option
    const [{isLoading,apiData,serverError}]=useFetchQuestion()
    const dispatch=useDispatch();

    //  const {questions}=useSelector(state=>state);
     // const question=data[0]

    const questions = useSelector(state => state.questions.queue[state.questions.trace])
    const trace = useSelector(state => state.questions.trace);

    const result = useSelector(state => state.result.result);
      
    useEffect(()=>{
      // console.log(state);
      // console.log({trace,checked});
      dispatch(updateResult({trace,checked}))
      // setChecked(undefined)
    },[checked]);
    
    //below function is sending value of selected index to onchecked function which can be accessed in quiz
    function onSelect(i){
        onChecked(i)
        setChecked(i); //setting the newly/updated index of selected option
        dispatch(updateResult({trace,checked}))
    }

    if(isLoading){
      return <h3 className='text-light'>isLoading</h3>
    }
    if(serverError){
      return <h3 className='text-light'>{serverError.message || "Unknown Error"}/</h3>
    }
    
  return (
    
     <div className='questions'>
        <h2 className='text-light'>{questions?.question}</h2>

        <ul key={questions?.id}>
            {
                questions?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={false}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${result[trace]==i ? 'checked' : ''}`}></div>
                        {/* <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div> */}
                    </li>
                ))
            }
        </ul>
    </div>
  
  )
}

export default Questions