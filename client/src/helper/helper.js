import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios'; //using this libraray we will make a get request

export function attempts_Number(result){ //this will give number of elements in result array which are not undefined
    return result.filter(r=>r!==undefined).length;
}

export function earnPoints_Number(result,answer,point){ //if element of result and answer match this function will result return 10 for that element an finally sum of all those 10 points
    return result.map((element,i)=>answer[i]===element).filter(i=>i).map(i=>point).reduce((prev,curr)=>prev+curr,0);
}
 
 export function flagResult(totalPoints,earnPoints){ //this will tell whether user passsed or not
    return (earnPoints>(totalPoints)/2) //user is passed if he scored more than half marks
 }

 export function CheckUserExist({children}){
    const auth=useSelector(state=>state.result.userId);
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>
 }

 /**Get server data-from here get request will go to backend*/
 export async function getServerData(url,callback){
    const data=await (await axios.get(url)).data; //used to make an HTTP GET request to the specified URL using the Axios library and retrieve data from the response
    // console.log(data)
    return callback ? callback(data) : data;
 }

//  getServerData('http://localhost:5000/api/result')

/**Post Server data */
 export async function postServerData(url,result,callback){
    const data=await (await axios.post(url,result))?.data; //used to make an HTTP GET request to the specified URL using the Axios library and retrieve data from the response
    // console.log(data)
    return callback ? callback(data) : data;
 }
   