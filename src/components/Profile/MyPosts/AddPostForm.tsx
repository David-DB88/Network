import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../Utils/Validators/Validators";
 import {createField, Textarea} from "../../../Utils/FormControl/FormsControls";
import {GetStringKeysType} from "../../Login/loginPage";

const maxlength5 = maxLengthCreator(50);
// const hocTextarea = WithInput("textarea");

type PropsType = {

}

export type AddPostFormVulesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeysType<AddPostFormVulesType>


const AddPostForm: React.FC<InjectedFormProps<AddPostFormVulesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddPostFormValuesTypeKeys>("Your Post", "newPostText", Textarea, [required, maxlength5])}
        </div>
         <div>
        <button>Add Post</button>
        <button>Remove</button>
      </div>
    </form>
  );
};

export default  reduxForm<AddPostFormVulesType,PropsType>({ form: "TexteriaForm" })(AddPostForm);

