import React from "react";
import s from "./../Dialogs.module.css";
import { Link } from "react-router-dom";

type PropsType ={
  id: number
  name: string
}

const DialogItem: React.FC<PropsType> = ({id, name }) => {
  return (
    <div className={s.dialog + " " + s.active}>
      <Link to={"/dialogs/" + id}>{name}</Link>
    </div>
  );
};

export default DialogItem;
