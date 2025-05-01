import React from "react";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { formatDate, handleCalendarChange, handleRequestRoom, handleSearchRoom, handleLastDate } from "utils/laundryHelpers";

import tableStyles from "style/Table.module.scss";

export const getLaundryFilters = ({
  room,
  setRoom,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  calendarVisible,
  setCalendarVisible,
  setLaundryValues,
  dispatch,
}) => [
  {
    type: "input",
    placeholder: "Комната",
    value: room,
    onChange: (e) => handleSearchRoom(e, setRoom),
    onSearch: () => handleRequestRoom(room, setLaundryValues, dispatch),
    onEnter: () => handleRequestRoom(room, setLaundryValues, dispatch),
    showError:
      room.length >= 3 && room.length <= 4 && !/^\d{3}[а]?$/i.test(room),
    errorMessage: "Не верно указан номер комнаты",
  },
  {
    type: "calendar",
    value: [formatDate(startDate), formatDate(endDate)],
    calendarVisible,
    setCalendarVisible,
    onChange: (value) => handleCalendarChange(value, setStartDate, setEndDate),
  },
];
export const getLaundryRenderCell = (
  editSlot,
  setEditSlot,
  setDeleteModalData,
  handleEditSlot,
  handleSaveEditSlot
) => {
  return (item, key, index) => {
    const value = item[key];

    if (key.startsWith("slot_")) {
      const isEditing =
        editSlot &&
        editSlot.date === item.date &&
        editSlot.time === item.time &&
        editSlot.key === key;

      return (
        <div className={tableStyles.lineCenter}>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => handleSaveEditSlot(e.target.value)}
              onBlur={() => setEditSlot(null)}
              className={`${
                index % 2 === 1
                  ? tableStyles.inputNoEvenRow
                  : tableStyles.inputEvenRow
              }`}
            />
          ) : (
            <p className={tableStyles.lineP}>{value}</p>
          )}

          {value !== "Свободно" ? (
            <RiDeleteBinLine
              className={`${tableStyles.buttonAction} ${tableStyles.delete}`}
              onClick={() => handleLastDate(value, item, setDeleteModalData)}
            />
          ) : isEditing ? (
            <FaCheck
              className={`${tableStyles.buttonAction} ${tableStyles.check}`}
              onClick={() => handleSaveEditSlot(value)}
            />
          ) : (
            <RiEditLine
              className={`${tableStyles.buttonAction} ${tableStyles.edit}`}
              onClick={() => handleEditSlot(item, key)}
            />
          )}
        </div>
      );
    }

    return item[key];
  };
};
