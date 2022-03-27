import React from "react";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Types/Type";

type PropsType ={
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File)=> void
    saveProfileInfo: (profile: ProfileType)=>void
    editMod: boolean
    setEditMod: (mod: boolean)=>void
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner = {props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfileInfo={props.saveProfileInfo}
        editMod={props.editMod}
        setEditMod={props.setEditMod}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
