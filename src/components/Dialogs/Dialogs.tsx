import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Massage from "./Massages/Massage";
import {Form, Field, reduxForm, InjectedFormProps} from "redux-form";
import { required, maxLengthCreator } from "../../Utils/Validators/Validators";
import {createField, Input, Textarea} from "../../Utils/FormControl/FormsControls";
import {InitialStateType} from "../../redux/dialogs-reducer";
// import {  WithInput } from "../../HOC/InputHOC/withInput";
const maxlength5 = maxLengthCreator(5);
// const hocTextarea = WithInput("textarea");
type OwnPropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

type NewMessageFormType = {
    newMessageBody: string;
}
type NewMessageFormValuesKeysType =Extract<keyof NewMessageFormType, string>
type PropsType = {}

const Dialogs: React.FC<OwnPropsType>= (props) => {
    debugger
    let state = props.dialogsPage
  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let massageElements = state.messages.map((m) => (
    <Massage massage={m.message} />
  ));

  const newMessage = (values: NewMessageFormType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className="messages">{massageElements}</div>
      <div>
        <NewMessageRedux onSubmit={newMessage} />
      </div>
    </div>
  );
};

const newMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
          {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", Textarea, [required, maxlength5])}
      <div>
        <button>add Massage</button>
      </div>
    </Form>
  );
};
const NewMessageRedux = reduxForm<NewMessageFormType>({ form: "newMessageForm" })(newMessageForm);

export default Dialogs;
