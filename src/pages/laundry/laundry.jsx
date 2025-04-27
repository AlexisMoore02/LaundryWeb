import React from "react";
import { Tabs } from "components/index";
import laundryImage from "assets/images/laundry.png";
import { IoPersonAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styles from "style/Laundry.module.scss";

const Laundry = () => {
  const role = sessionStorage.getItem("roles");
  const navigate = useNavigate();
  function ToBots() {
    navigate({
      pathname: "/createAdmin ",
    });
  }
  return (
    <div className={styles.laundry}>
      <div className={styles.header}>
        <div className={styles.bot}>
          <img src={laundryImage} alt="" className={styles.icon} />
          <h2 className={styles.name}>Laundry | Запись на стирку РФФ</h2>
        </div>
        {role === "God" && (
          <button className={styles.button} onClick={ToBots}>
            <IoPersonAdd className={styles.icon} />
          </button>
        )}
      </div>
      <Tabs />
    </div>
  );
};

export default Laundry;
