import { format } from "date-fns";
import { handleActionForError, setModalData} from 'store/actions/errorActions'
export const formatDate = (date) => {
  return format(date, "dd.MM.yyyy");
};

export const handleCalendarChange = (value, setStartDate, setEndDate) => {
  if (value.length === 2) {
    setStartDate(value[0]);
    setEndDate(value[1]);
  }
};

export const handleRequestRoom = async (
  room,
  setLaundryValues,
  dispatch
) => {
  if (room.trim() !== "") {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_API}/laundry_room?room=${room}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
          },
        }
      );
      const result = await response.json();
      if (result.errcode === 0) {
        const sortedData = result.result.sort(
          (a, b) =>
            new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`)
        );
        setLaundryValues(sortedData);
      } else {
    const modalData = handleActionForError(result.errcode);
         dispatch(setModalData(modalData)); 
            throw new Error("Error fetching room data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }
};
export const validateInput = (inputValue) => {
  const regex = /^\d{3}[а]?$/;
  return regex.test(inputValue);
};
export const handleSearchRoom = (e, setRoom) => {
  const value = e;
  console.log(value);
  if (value.length >= 1 && isNaN(value[0])) {
    setRoom("");
  } else if (validateInput(value)) {
    setRoom(value);
  } else setRoom(value);
};

export const handleLastDate = (slotValue, row, setDeleteModalData) => {
  const slotKey = Object.keys(row).find(
    (key) => row[key] === slotValue && key.startsWith("slot_")
  );
  if (!slotKey) return;

  setDeleteModalData({
    isOpen: true,
    room: slotValue,
    date: row.date,
    time: row.time,
    slotNumber: slotKey,
  });
};
