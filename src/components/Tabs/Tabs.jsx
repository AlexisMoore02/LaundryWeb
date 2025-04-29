import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "store/actions/pageStateActions";
import styles from "style/Tabs.module.scss";

export const Tabs = ({ TabsList }) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.pageState.activeTab);

  const handleTabClick = (id) => {
    dispatch(setActiveTab(id));
  };

  return (
    <div>
      <ul className={styles.tabs}>
        {TabsList.map(({ id, title, visible = true }) =>
          visible ? (
            <li
              key={id}
              className={activeTab === id ? styles.active : ""}
              onClick={() => handleTabClick(id)}
            >
              {title}
            </li>
          ) : null
        )}
      </ul>
      <div className={styles.tab_content}>
        {TabsList.find((tab) => tab.id === activeTab)?.context || null}
      </div>
    </div>
  );
};
