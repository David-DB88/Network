import React from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" activeClassName={s.activeLink}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>

      </div>
      <div className={`${s.item} `}>
        <NavLink to="/dialogs" activeClassName={s.activeLink}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" activeClassName={s.activeLink}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" activeClassName={s.activeLink}>
          Music
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" activeClassName={s.activeLink}>
          Settings
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/friends"
          activeClassName={s.activeLink}
          className={s.friend}
        >
          Friends
        </NavLink>
        <div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAul_QJonV108RRTLmYREMKl3NpvBHMqWCTq_vcEhFXgm5s9r&s" />

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAul_QJonV108RRTLmYREMKl3NpvBHMqWCTq_vcEhFXgm5s9r&s" />

            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAul_QJonV108RRTLmYREMKl3NpvBHMqWCTq_vcEhFXgm5s9r&s" />
          </div>
          <div>bob bob bob</div>
          {/* <div className={s.massage}>{props.massage}</div> */}
          <div>{/* <span>like {props.likeCounts}</span> */}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
