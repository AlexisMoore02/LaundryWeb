import React, { useState, useEffect } from "react";

import Laundry_Table from "pages/laundry/tabs-content/laundry-table";
// import Users_Info from "../../pages/laundry/tabs-content/users_info";
// import Position from "../../pages/laundry/tabs-content/position";
// import Mailing from "../../pages/laundry/tabs-content/mailing";

import "react-calendar/dist/Calendar.css";
import styles from "style/Tabs.module.scss";

export const Tabs = () => {
  const role = sessionStorage.getItem("roles");
  const savedActiveTab = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(
    savedActiveTab ? parseInt(savedActiveTab) : 1
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab.toString());
  }, [activeTab]);

  const handleTabClick = (id) => {
    console.log("Tab clicked:", id);
    setActiveTab(id);
  };

  return (
    <div>
    <ul className={styles.tabs}>
        <li
          className={activeTab === 1 ? `${styles.active}` : ""}
          onClick={() => handleTabClick(1)}
        >
          СТИРКА
        </li>

        <li
          className={activeTab === 2 ? `${styles.active}` : ""}
          onClick={() => handleTabClick(2)}
        >
          ПОЛЬЗОВАТЕЛИ
        </li>

        <li
          className={activeTab === 3 ? `${styles.active}` : ""}
          onClick={() => handleTabClick(3)}
        >
          ПОЗИЦИЯ
        </li>
        {role === "God" && (
          <li
            className={activeTab === 4 ? `${styles.active}` : ""}
            onClick={() => handleTabClick(4)}
          >
            РАССЫЛКА
          </li>
        )}
      </ul>

      <div className={styles.tab_content}>
        {activeTab === 1 && <Laundry_Table />}
        {
          activeTab === 2 && <></>
          // <Users_Info />
        }
        {
          activeTab === 3 && <></>
          //  <Position />
        }
        {
          role === "God" && activeTab === 4 && <></>
          // <Mailing />
        }
      </div>
    </div>
  );
}; 
