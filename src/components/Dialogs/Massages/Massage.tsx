import React from "react";
import s from "./../Dialogs.module.css";

type PropsType = {
    massage: string
}

const Massage: React.FC<PropsType> = props => {
    return (
        <div>
            <div>
                <div className={s.message}>{props.massage}</div>
            </div>
        </div>
    );
};

export default Massage;
