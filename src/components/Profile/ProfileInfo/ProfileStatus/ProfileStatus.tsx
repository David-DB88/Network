import React, { ChangeEvent } from "react";
type PropsType = {
  status: string
  updateStatus: (status: string)=> void
}

type StateType = {
  editMod: boolean
  status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editMod: false,
    status: this.props.status
  }
  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }

  activateedit = () => {
    this.setState({ editMod: true });
  };

  deactivateedit() {
    this.setState({ editMod: false });

    this.props.updateStatus(this.state.status);
  };
  updateStatusState = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.target.value
    })
  };
  render() {
    return (
      <div>
        {!this.state.editMod && (
          <div>
           <b>Status</b> <span onClick={this.activateedit}>
              {this.props.status || "Set Your Status"}
            </span>
          </div>
        )}
        {
          this.state.editMod && (
            <div>
              <input
                onChange={this.updateStatusState}
                autoFocus
                onBlur={this.deactivateedit.bind(this)}
                value={this.state.status}
              />
            </div>
          )
        }
      </div >
    );
  }
};
export default ProfileStatus;
