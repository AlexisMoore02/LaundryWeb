import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleActionForError, closeModal, setModalData } from "store/actions/errorActions";

import * as Component from "components/index";
import * as useHook from "hooks/index";
import * as Utils from "utils/index"; 

const MY_API = process.env.REACT_APP_USER_API;

const UsersInfo = () => {
  const errorModal = useSelector((state) => state.error.modalData);
  const [loading, setLoading] = useState(false);
  const [laundryValues, setLaundryValues] = useState([]);
  const [userId, setUserId] = useState("");
  const [userByName, setUserByName] = useState("");
  const [editedRooms, setEditedRooms] = useState({});
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [editableRowId, setEditableRowId] = useState(null);
  const [room, setRoom] = useState("");

  const { fetchData } = useHook.useApi();

  const isInitialMount = useRef(true);
  const filtersUserRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRequestUserInfo = async () => {
    setLoading(true);
    fetchData({
      url: `${MY_API}/get_user_info`,
      method: "POST",
      onSuccess: (data) => {
        setLaundryValues(data);
      },
      onError: (errcode) => {
        const modalData = handleActionForError(errcode, navigate);
        dispatch(setModalData(modalData));
      },
      onFinally: () => setLoading(false),
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      handleRequestUserInfo();
      setLoading(false);
    };
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const handleClick = (event) =>
      Utils.FilterHelpers. handleClickOutside(event, filtersUserRef, setFilterVisible);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const filters = useMemo(
    () =>
      Utils.Users.getUserFilters({
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
      }),
    [
      filterValue,
      filterVisible,
      isFilterCollapsed,
      selectedFilter,
      selectedFilters,
      userId,
      userByName,
    ]
  );

  const renderCell = useMemo(
    () =>
      Utils.Users.getUserRenderCell(
        editedRooms,
        editableRowId,
        setEditableRowId,
        room,
        setRoom,
        setEditedRooms
      ),
    [editedRooms, editableRowId, room]
  );

  return (
    <>
      <Component.Filters filters={filters} filtersRef={filtersUserRef} />

      <Component.Table
        columns={Utils.Users.columns}
        data={laundryValues}
        loading={loading}
        renderCell={renderCell}
      />

      <Component.Modals
        isOpen={errorModal.isOpen}
        onClose={() => dispatch(closeModal())}
        title={errorModal.title}
        content={errorModal.content}
        error={true}
      />
    </>
  );
};

export default UsersInfo;
