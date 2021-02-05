import { actions } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { witthAuthRedirect } from "../../HOC/withAuthRedirect";
import { compose } from "redux";
import {AppStateType} from "../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};


export default compose<React.ComponentType>(
  connect(mapStateToProps, {...actions}),
  witthAuthRedirect
)(Dialogs);
