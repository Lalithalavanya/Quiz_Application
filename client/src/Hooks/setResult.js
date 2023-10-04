import * as Action from '../redux/result_reducer'
import { postServerData } from '../helper/helper'

// export function PushAnswer(result){
//     return {
//         async function(dispatch){
//             try {
//                 await dispatch(Action.pushResultAction(result))
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
// }

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

/**insert user data in mongoDB database*/
export const usePublishResult = (resultData) => {
    const { result, username } = resultData;
    (async () => {
        try {
            if(result?!.length!==0 && !username) throw new Error("Couldn't get Result");
            await postServerData('https://quiz-application-api.vercel.app/api/result', resultData, data => data)
        } catch (error) {
            console.log(error)
        }
    })();
}






