import {InferActionsTypes} from "./redux-store";

type DialogsType ={
  id: number,
  name: string
} 
type MessagesType ={
  id: number,
  message: string
}
let initialState = {
  dialogs: [
    { id: 1, name: "Dimich" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valeria" },
  ] as Array<DialogsType>,
  messages: [
    { id: 1, message: "hi" },
    { id: 2, message: "How is your day" },
    { id: 3, message: "it's fine" },
    { id: 4, message: "yo" },
    { id: 5, message: "yo" },
    { id: 6, message: "yo" },
  ]as Array<MessagesType>,
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SEND_MASSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: body }],
      };
    default:
      return state;
  }
};


export const actions = {
  sendMessage: (newMessageBody: string)=> ({
    type: 'SEND_MASSAGE',
    newMessageBody,
  } as const)
}

export default dialogsReducer;
