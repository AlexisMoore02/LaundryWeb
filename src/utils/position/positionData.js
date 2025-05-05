import * as Utils from "./index";
import { RiEditLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import * as Position from "utils/position/index";
import tableStyles from "style/Table.module.scss";

export const getPositionFilters = ({
  userId,
  setUserId,
  setLaundryValues,
  dispatch,
}) => [
  {
    type: "input",
    placeholder: "ID user",
    value: userId,
    onChange: (e) => setUserId(e.target.value),
    onSearch: () =>
      Utils.handleRequestPosition(userId, setLaundryValues, dispatch),
    onEnter: () =>
      Utils.handleRequestPosition(userId, setLaundryValues, dispatch),
  },
];

export const getPositionRenderCell = (
  editedPosition,
  editableRowId,
  setEditableRowId,
  position,
  setPosition,
  setEditedPosition
) => {
  return (item, key, index) => {
    const value = item[key]; 
    if (key === "position") {
      return (
        <div className={tableStyles.lineCenter}>
          <input
            type="text"
            className={
              index % 2 === 1
                ? tableStyles.inputNoEvenRow
                : tableStyles.inputEvenRow
            }
            value={editedPosition[item.user_id] || item.position}
            readOnly={!editableRowId || editableRowId !== item.user_id}
            onChange={(e) =>
              Position.handlePositionChange(e, item, setPosition, setEditedPosition)
            }
          />
          {editableRowId === item.user_id ? (
            <FaCheck
              className={`${tableStyles.buttonAction} ${tableStyles.check}`}
              onClick={() => Position.handlePositionChangeStart(item, setEditedPosition, position)}
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