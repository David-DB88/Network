import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfileInfo,
    setEditMod
} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
// import {witthAuthRedirect} from "../../HOC/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../Types/Type";

type  MapStatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getProfile: (userid: number)=>void
    getStatus: (usreid: number)=>void
    updateStatus: (status: string)=>void
    savePhoto: (file: File)=> void
    saveProfileInfo: (profile: ProfileType)=>void
    setEditMod: ()=>void
}
type PathParamsType = {
    userid: string,
}


type PropsType = MapStatePropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    userprofile() {
        let userid: number|null = +this.props.match.params.userid;
        if (!userid) {
            userid = this.props.useridAuthorized;
            if (!userid) {
                //todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }
        userid && this.props.getProfile(userid);
        userid && this.props.getStatus(userid);
    }

    componentDidMount() {
        this.userprofile()
    }

    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userid !== prevProps.match.params.userid) {
            this.userprofile()
        }
    }

    render() {
        return (
            <Profile
                {...this.props}
                isOwner={!this.props.match.params.userid}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfileInfo={this.props.saveProfileInfo}
                editMod={this.props.editMod}
                setEditMod={this.props.setEditMod}
            />
        );
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        editMod: state.profilePage.editMod,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        useridAuthorized: state.auth.userid,
    };
};
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfileInfo, setEditMod}),
    withRouter
    // witthAuthRedirect
)(ProfileContainer);
