import React from "react";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { filterOptions } from "constants/filterOptions";
import { handleResetFilter, handleCheckboxChange } from "utils/filterHelpers";
import * as Users from "utils/users/index";

import tableStyles from "style/Table.module.scss";

export const columns = [
    { key: "user_id", title: "ID пользователя" },
    { key: "first_name", title: "Имя" },
    { key: "last_name", title: "Фамилия" },
    { key: "last_date", title: "Последняя запись" },
    { key: "room", title: "Комната" },
    { key: "ban", title: "Бан / не бан" },
    { key: "active", title: "Active / NoActive" },
  ];

  export const getUserFilters = ({
    filterValue,
    filterVisible,
    isFilterCollapsed,
    selectedFilter,
    selectedFilters,
    userId,
    setUserId,
    userByName,
    setUserByName,
    setSelectedFilter,
    setSelectedFilters,
    setFilterValue,
    setFilterVisible,
    setIsFilterCollapsed,
    handleRequestUserInfo,
  }) => {
    const onCheckboxChange = (value, label) =>
      handleCheckboxChange(
        value,
        label,
        selectedFilter,
        setSelectedFilter,
        setSelectedFilters,
        setFilterValue,
        setFilterVisible,
        setIsFilterCollapsed
      );
  
    const onReset = () =>
      handleResetFilter(
        setSelectedFilter,
        setSelectedFilters,
        setFilterValue,
        setIsFilterCollapsed,
      );
  
    const base = [
      {
        type: "select",
        value: filterValue,
        visible: filterVisible,
        collapsed: isFilterCollapsed,
        selected: selectedFilter,
        selectedValues: selectedFilters,
        options: filterOptions,
        onToggle: () => setFilterVisible(!filterVisible),
        onToggleCollapse: () => setIsFilterCollapsed(!isFilterCollapsed),
        onClose: () => setFilterVisible(false),
        onCheckboxChange,
        onReset,
        onRequest: handleRequestUserInfo,
      },
    ];
  
    if (filterValue === "Id пользователя") {
      base.push({
        type: "input",
        placeholder: "Id пользователя",
        value: userId,
        onChange: setUserId,
        onSearch: () => Users.handleUserId(userId),
        onEnter: () => Users.handleUserId(userId),
      });
    } else if (filterValue === "Имя Фамилия") {
      base.push({
        type: "input",
        placeholder: "Имя Фамилия",
        value: userByName,
        onChange: setUserByName,
        onSearch: () => Users.handleUserByName(userByName),
        onEnter: () => Users.handleUserByName(userByName),
      });
    }
  
    return base;
  };
  
   
  export const getUserRenderCell = (
    editedRooms,
    editableRowId,
    setEditableRowId,
    room,
    setRoom,
    setEditedRooms
  ) => {
    return (item, key, index) => {
      const value = item[key];
  
      if (key === "ban") {
        const isBanned = item.ban !== "0";
        return (
          <button
            className={tableStyles.banButton}
            onClick={() => Users.handleBanToggle(item.user_id, value)}
          >
            {!isBanned ? "Заблокировать" : "Разблокировать"}
          </button>
        );
      }
  
      if (key === "active") {
        const isBanned = item.ban !== "0";
        return (
          <button
            className={tableStyles.banButton}
            onClick={() => Users.handleBanToggle(item.user_id, value)}
          >
            {isBanned ? "Активировать" : "Деактивировать"}
          </button>
        );
      }
  
      if (key === "last_date") {
        return (
          <div className={tableStyles.lineCenter}>
            <p className={tableStyles.lineP}>{value}</p>
            <RiDeleteBinLine
              className={`${tableStyles.buttonAction} ${tableStyles.delete}`}
              onClick={() => Users.handleLastDate(item.user_id)}
            />
          </div>
        );
      }
  
      if (key === "room") {
        return (
          <div className={tableStyles.lineCenter}>
            <input
              type="text"
              className={
                index % 2 === 1
                  ? tableStyles.inputNoEvenRow
                  : tableStyles.inputEvenRow
              }
              value={editedRooms[item.user_id] || item.room}
              readOnly={!editableRowId || editableRowId !== item.user_id}
              onChange={(e) =>
                Users.handleRoomChange(e, item, setRoom, setEditedRooms)
              }
            />
            {editableRowId === item.user_id ? (
              <FaCheck
                className={`${tableStyles.buttonAction} ${tableStyles.check}`}
                onClick={() => Users.handleRoomChangeStart(item, setEditedRooms, room)}
              />
            ) : (
              <RiEditLine
                className={`${tableStyles.buttonAction} ${tableStyles.edit}`}
                onClick={() => setEditableRowId(item.user_id)}
              />
            )}
          </div>
        );
      }
  
      return value;
    };
  };