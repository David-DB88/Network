import { userAuth } from "./auth-reducer";
import {InferActionsTypes} from "./redux-store";



let initialState = {
  initialized: false,
};
type InitialStateType= typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/APP/SET_INITIALIZEDSUCCESS':
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const  actions = {
  setInitializdSuccess: ()=> ({
    type: 'SN/APP/SET_INITIALIZEDSUCCESS',
  } as const)
}


export const initializingApp = () => {
  return (dispatch: any) => {
    let promisResault = dispatch(userAuth());
    Promise.all([promisResault]).then(() => {
      dispatch(actions.setInitializdSuccess());
    });
  };
};

export default appReducer;
