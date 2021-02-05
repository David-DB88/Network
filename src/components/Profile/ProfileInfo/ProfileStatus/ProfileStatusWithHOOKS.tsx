import React, {ChangeEvent} from "react";
import { useState } from "react";
import { useEffect } from "react";


type PropsType ={
  status: string
  updateStatus: (status: string)=>void
}
const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editMod, setEditMod] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);
  const activateedit = () => {
    setEditMod(true);
  };
  const deactivateedit = () => {
    setEditMod(false);

    props.updateStatus(status);
  };
  const updateStatusState = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      {!editMod && (
        <div>
          <span onClick={activateedit}>
            {props.status || "Set Your Status"}
          </span>
        </div>
      )}
      {editMod && (
        <div>
          <input
            onChange={updateStatusState}
            autoFocus
            onBlur={deactivateedit}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatus;
