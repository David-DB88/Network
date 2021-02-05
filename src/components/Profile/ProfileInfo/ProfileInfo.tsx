import React, {ChangeEvent, useState} from "react";
import s from "./ProfileInfo.module.css";
import l from "../../../assets/images/gifLoder.module.css";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import FormDataInfoReduxForm from "./FormDataInfo";
import {ContactType, ProfileType} from "../../../Types/Type";

type  PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
    saveProfileInfo: (profile: ProfileType)=>void
    editMod: boolean
    setEditMod: (mod: boolean)=>void
}

const ProfileInfo: React.FC<PropsType> = ({ profile, status,updateStatus,isOwner,savePhoto, saveProfileInfo}) => {
let [editMod, setEditMod] = useState(false)
    const onSubmit = (formData: ProfileType) => {
        saveProfileInfo(formData)

    }

    if (!profile) {
        return <div className={l.loader}>Loading...</div>;
    }
    const sandPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    };


    return (
        <div>
            <div>
                <img src="https://cs8.pikabu.ru/post_img/big/2017/03/05/11/1488741312164030715.jpg" alt={"Profile Pic"}/>
            </div>
            <div className={s.descriptinoBlok}>
                <img src={profile.photos.small} alt={"Profile Pic"}
                />
                {isOwner && <input
                    type={"file"}
                    onChange={(e) => {
                        sandPhoto(e);
                    }}
                />}
                {editMod ?
                    <FormDataInfoReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/> :
                    <FormData goToEditMod={() =>setEditMod(true)} isOwner={isOwner} profile={profile}/>}

            </div>
            <div>
                <ProfileStatus
                    status={status}
                    updateStatus={updateStatus}
                />
            </div>
        </div>
    );
};
type PropsFormDataType ={
    goToEditMod: ()=>void
    isOwner: boolean
    profile: ProfileType
}
const FormData: React.FC<PropsFormDataType> = ({goToEditMod, isOwner, profile}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMod}>edit</button></div>}

        <div>
            <b>Name</b>: {profile.fullName}
        </div>
        <div>
            <b>looking For a Job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>looking For a Job Description</b>: {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(keys => {
            return <Contacts key={keys} contactsKeys={keys} contactValues={profile.contacts[keys as keyof ContactType]}/>
        })}
        </div>
    </div>
}

type ContactsPopsType ={
    contactsKeys: string
    contactValues: string
}
const Contacts: React.FC<ContactsPopsType> = ({contactsKeys, contactValues}) => {
    return <div className={s.contacts}><b>{contactsKeys}</b>: {contactValues}</div>
}
export default ProfileInfo;
