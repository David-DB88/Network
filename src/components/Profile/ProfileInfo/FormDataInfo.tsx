import React from "react";
import {Form, InjectedFormProps, reduxForm} from "redux-form";
import {createField} from "../../../Utils/FormControl/FormsControls";
import {Input, Textarea} from "../../../Utils/FormControl/FormsControls";
import e from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Types/Type";
import {GetStringKeysType} from "../../Login/loginPage";

// const hocInput = WithInput("input");
// const hocTextarea = WithInput("textarea");

type PropsType ={
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeysType<ProfileType>

const FormDataInfo: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType>  = ({handleSubmit, error, profile}) => {


    return (
        <Form onSubmit={handleSubmit}>
            <div> <button>Save</button></div>
            {error && <div className={e.errorMessage}>{error}</div>}

            <div><b>Name</b>: {createField<ProfileTypeKeys>("Name", "fullName", Input, [])}</div>
            <div><b>looking For a Job</b>: {createField<ProfileTypeKeys>("", "lookingForAJob", Input, [], "checkbox")}</div>
            {<div><b>My Professional skils</b>: {createField<ProfileTypeKeys>("My Professional skils", "lookingForAJobDescription", Textarea, [])}</div>}
            <div><b>About me</b>: {createField("About me", "AboutMe", Textarea, [])}</div>
            <div><b>Contacts</b>: {Object.keys(profile.contacts).map(keys => {
                // todo: creat some solution for embedded objects
                return <div key={keys}><b>{keys}</b>: {createField(keys, "contacts." + keys, Input, [])}</div>
            })}
            </div>
        </Form>
    )
}

const FormDataInfoReduxForm = reduxForm<ProfileType,PropsType>({
    form: "profile-info",
})(FormDataInfo);
export default FormDataInfoReduxForm

