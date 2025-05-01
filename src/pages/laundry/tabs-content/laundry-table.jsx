import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { defaultDateFrom, defaultDateTo } from "constants/dateDefaults";
import { getLaundryFilters, getLaundryRenderCell } from "./laundry-data";
import { closeModal } from "store/actions/errorActions";
import { fetchLaundryData } from "utils/laundryHelpers";

import * as useHook from "hooks/index";
import * as Component from "components/index";

  const FREE_SLOT_STATUS = "Свободно";

const LaundryTable = () => {
  const [startDate, setStartDate] = useState(defaultDateFrom.toDate());
  const [endDate, setEndDate] = useState(defaultDateTo.toDate());
  const [editSlot, setEditSlot] = useState({ id: null, key: null });
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [laundryValues, setLaundryValues] = useState();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState("");

  const { fetchData } = useHook.useApi();

  const errorModal = useSelector((state) => state.error.modalData);

  const calendarContainerRef = useRef(null);
  const filtersUserRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    fetchLaundryData(startDate, endDate, fetchData, setLaundryValues, setLoading, dispatch, navigate);
  }, [startDate, endDate]);
  

  const handleEditSlot = (item, key) => {
    setEditSlot({ date: item.date, time: item.time, key });
  };

  const handleSaveEditSlot = (editedRoom) => {
    setLaundryValues((prev) => {
      return prev.map((item) => {
        if (item[editSlot.key] === FREE_SLOT_STATUS) {
          return { ...item, [editSlot.key]: editedRoom };
        }
        return item;
      });
    });
    setEditSlot(null);
  };

  const [deleteModalData, setDeleteModalData] = useState({
    isOpen: false,
    room: "",
    date: "",
    time: "",
    slotNumber: "",
  });

  const filters = useMemo(
    () =>
      getLaundryFilters({
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
      }),
    [room, startDate, endDate, calendarVisible]
  );

  const machineKeys = Object.keys(laundryValues?.[0] || {}).filter((key) =>
    key.startsWith("slot_")
  );
  const renderCell = useMemo(
    () => getLaundryRenderCell( editSlot, setEditSlot, setDeleteModalData, handleEditSlot, handleSaveEditSlot ),
    [editSlot]
  );
  const columns = [
    { key: "date", title: "Дата" },
    { key: "time", title: "Время" },
    ...machineKeys.map((key, index) => ({ key, title: `Машинка №${index + 1}`, })),
  ];
  return (
    <>
      <Component.Filters filters={filters} filtersRef={filtersUserRef} />

      <Component.Table columns={columns} data={laundryValues} loading={loading} renderCell={renderCell} />

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
            closeModal={() => setDeleteModalData((prev) => ({ ...prev, isOpen: false })) }
          />
        }
        error={false}
      />
    </>
  );
};

export default LaundryTable;
