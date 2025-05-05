import React, { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { Tabs } from "components/index";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { hasAccess } from "utils/access";

import laundryImage from "assets/images/laundry.png";
import styles from "style/Laundry.module.scss";

import LaundryTable from "./tabs-content/laundryTable";
import UsersInfo from "./tabs-content/usersInfo";
import Position from "./tabs-content/position";
// import Mailing from "./tabs-content/mailing";

const Laundry = () => {
  const { loggedIn, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const TabsList = [
    { id: 1, title: "СТИРКА", context: <LaundryTable /> },
    { id: 2, title: "ПОЛЬЗОВАТЕЛИ", context: <UsersInfo /> },
    { id: 3, title: "ПОЗИЦИЯ", context: <Position /> },
    // { id: 4, title: "РАССЫЛКА", context: <Mailing />, visible: hasAccess(loggedIn, role, ["God"])},
  ];

  const ToBots = () => {
    navigate({ pathname: "/createAdmin" });
  };

  return (
    <div className={styles.laundry}>
      <div className={styles.header}>
        <div className={styles.bot}>
          <img src={laundryImage} alt="" className={styles.icon} />
          <h2 className={styles.name}>Laundry | Запись на стирку РФФ</h2>
        </div>
        {hasAccess(loggedIn, role, ["God"]) && (
          <button className={styles.button} onClick={ToBots}>
            <IoPersonAdd className={styles.icon} />
          </button>
        )}
      </div>
      <Tabs TabsList={TabsList} />
    </div>
  );
};

export default Laundry;
