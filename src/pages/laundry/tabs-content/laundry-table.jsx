import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
 
import {
  handleActionForError,
  closeModal,
  setModalData,
} from "store/actions/errorActions";
import {
  formatDate,
  handleCalendarChange,
  handleRequestRoom,
  handleSearchRoom,
  handleLastDate,
} from "utils/laundryHelpers";

import * as useHook from "hooks/index";
import * as Component from "components/index";

import tableStyles from "style/Table.module.scss";
 
const MY_API = process.env.REACT_APP_USER_API;

const LaundryTable = () => { 
  const defaultDateFrom = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  const defaultDateTo = moment().add(7, "days").set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
 
  const [startDate, setStartDate] = useState(defaultDateFrom.toDate());
  const [endDate, setEndDate] = useState(defaultDateTo.toDate());
  const [room, setRoom] = useState("");
  const [laundryValues, setLaundryValues] = useState();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [loading, setLoading] = useState(false); 
  const { fetchData } = useHook.useApi();
  const errorModal = useSelector((state) => state.error.modalData);

  const filtersUserRef = useRef(null);
  const calendarContainerRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorModal.isOpen) {
      console.log("Modal is open, content:", errorModal.content); 
    }
  }, [errorModal]);


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (calendarContainerRef.current && !calendarContainerRef.current.contains(e.target)) {
        setCalendarVisible(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchData({
      url: `${MY_API}/laundry_values?start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`,
      method: "POST",
      onSuccess: (data) => {
        const sortedData = data.sort((a, b) => new Date(`${a.date} ${a.time}`) - new Date(`${b.date} ${b.time}`));
        setLaundryValues(sortedData); 
      },
      onError: (errcode) => {
        const modalData = handleActionForError(errcode, navigate);
        dispatch(setModalData(modalData));
      },
      onFinally: () => setLoading(false),
    });
  }, [startDate, endDate]);

  const [editSlot, setEditSlot] = useState(null);
  const handleEditSlot = (data) => {
    //TO DO REQUEST
  }
  const [deleteModalData, setDeleteModalData] = useState({
    isOpen: false,
    room: "",
    date: "",
    time: "",
    slotNumber: "",
  });

  return (
    <>
      <Component.Filters
        filters={[
          {
            type: "input",
            placeholder: "Комната",
            value: room,
            onChange: (e) => handleSearchRoom(e, setRoom),
            onSearch: () => handleRequestRoom(room, setLaundryValues, dispatch),
            onEnter: () => handleRequestRoom(room, setLaundryValues, dispatch),
            showError: room.length >= 3 && room.length <= 4 && !/^\d{3}[а]?$/i.test(room),
            errorMessage: "Не верно указан номер комнаты",
          },
          {
            type: "calendar",
            value: [formatDate(startDate), formatDate(endDate)],
          },
        ]}
        calendarVisible={calendarVisible}
        setCalendarVisible={setCalendarVisible}
        handleCalendarChange={(value) => handleCalendarChange(value, setStartDate, setEndDate)}
        filtersRef={filtersUserRef}
      />

      <Component.Table
        columns={[
          { key: "date", title: "Дата" },
          { key: "time", title: "Время" },
          { key: "slot_1", title: "Машинка №1" },
          { key: "slot_2", title: "Машинка №2" },
        ]}
        data={laundryValues}
        loading={loading}
        renderCell={(item, key) => {
          const value = item[key];

          if (["slot_1", "slot_2", "slot_3", "slot_4"].includes(key)) {
            return (
              <div className={tableStyles.lineCenter}>
                <p className={tableStyles.lineP}>{value}</p>
                {value !== "Свободно" ? (
                  <RiDeleteBinLine
                    className={`${tableStyles.buttonAction} ${tableStyles.delete}`}
                    onClick={() => handleLastDate(value, item, setDeleteModalData)}
                  />
                ) : (
                  <RiEditLine
                    className={`${tableStyles.buttonAction} ${tableStyles.edit}`}
                    onClick={() => handleEditSlot(item[key])}
                  />
                )}
              </div>
            );
          }

          return item[key];
        }}
      />

      <Component.Modals
        isOpen={errorModal.isOpen}
        onClose={() => dispatch(closeModal())}
        title={errorModal.title}
        content={errorModal.content}
        error={true}
      />

      <Component.Modals
        isOpen={deleteModalData.isOpen}
        onClose={() => setDeleteModalData((prev) => ({ ...prev, isOpen: false }))}
        title={"Удаление записи на стирку"}
        content={
          <Component.DeleteEntry
            room={deleteModalData.room}
            date={deleteModalData.date}
            time={deleteModalData.time}
            slotNumber={deleteModalData.slotNumber}
            isOpen={deleteModalData.isOpen}
            closeModal={() => setDeleteModalData((prev) => ({ ...prev, isOpen: false }))}
          />
        }
        error={false}
      />
    </>
  );
};

export default LaundryTable;
