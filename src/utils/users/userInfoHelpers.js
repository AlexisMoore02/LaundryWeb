export const handleUserByName = async () => {
  // try {
  //   const fullName = userByName;
  //   const [firstName, lastName] = fullName.split(" ");
  //   const response = await fetch(
  //     `${MY_API}/get_usr_by_name?first_name=${firstName}&last_name=${lastName}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${MY_TOKEN}`,
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   if (result.errcode === 0) {
  //     setLaundryValues(result.result);
  //   } else {
  //     const modalData = handleActionForError(result.errcode);
  //     dispatch(setModalData(modalData));
  //   }
  // } catch (error) {
  //   console.error("Error fetching data:", error.message);
  // }
};
export const handleUserId = async () => {
  // try {
  //   const response = await fetch(
  //     `${MY_API}/get_usr_by_id?user_id=${userId}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         Authorization: `Bearer ${MY_TOKEN}`,
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   if (result.errcode === 0) {
  //     setLaundryValues(result.result);
  //   } else {
  //     const modalData = handleActionForError(result.errcode);
  //     dispatch(setModalData(modalData));
  //   }
  // } catch (error) {
  //   console.error("Error fetching data:", error.message);
  // }
};
export const handleBanToggle = async (userId, currentBanStatus) => {
  // console.log(`Toggling ban for user ${userId}`);
  // let endpoint, action;
  // if (currentBanStatus === "0") {
  //   endpoint = "/ban_user";
  //   action = "ban";
  // } else {
  //   endpoint = "/unban_user";
  //   action = "unban";
  // }
  // try {
  //   const response = await fetch(`${MY_API}${endpoint}?user_id=${userId}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${MY_TOKEN}`,
  //     },
  //   });
  //   const result = await response.json();
  //   if (result.errcode === 0) {
  //     await fetch(`${MY_API}/get_usr_by_id?user_id=${userId}`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${MY_TOKEN}`,
  //       },
  //     });
  //     // setTimeout(() => {
  //     handleRequestUserInfo();
  //     // }, 2000);
  //   } else {
  //     const modalData = handleActionForError(result.errcode);
  //     dispatch(setModalData(modalData));
  //   }
  // } catch (error) {
  //   console.error(`Error ${action} user:`, error.message);
  // }
};
export const handleLastDate = async (value, row, setDeleteModalData) => {
  setDeleteModalData({
    isOpen: true, 
    room: row.room,
    user_id:value,
    date: row.date, 
  });
  // try {
  //   const response = await fetch(
  //     `${MY_API}/delete_last_date?user_id=${user_id}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${MY_TOKEN}`,
  //       },
  //     }
  //   );
  //   const result = await response.json();
  //   if (result.errcode === 0) {
  //     await fetch(`${MY_API}/get_usr_by_id?user_id=${user_id}`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${MY_TOKEN}`,
  //       },
  //     });
  //     handleRequestUserInfo();
  //   } else {
  //     const modalData = handleActionForError(result.errcode);
  //     dispatch(setModalData(modalData));
  //   }
  // } catch (error) {
  //   console.error("Error updating room:", error.message);
  // }
};
export const handleRoomChangeStart = async (user, setEditedRooms, room) => {
  // console.log("Submitting changes for user:", user.user_id, room);
  // const response = await fetch(
  //   `${MY_API}/new_room?user_id=${user.user_id}&room=${room}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${MY_TOKEN}`,
  //     },
  //   }
  // );
  // const result = await response.json();
  // if (result.errcode === 0) {
  //   await fetch(`${MY_API}/get_usr_by_id?user_id=${user.user_id}`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${MY_TOKEN}`,
  //     },
  //   });
  //   handleRequestUserInfo();
  //   setEditableRowId(null);
  // } else {
  //   console.log("Submitting changes for user:", result.errcode);
  //   const modalData = handleActionForError(result.errcode);
  //   setEditableRowId(null);
  //   setEditedRooms(user.room);
  //   dispatch(setModalData(modalData));
  // }
};
export const handleRoomChange = (event, user, setRoom, setEditedRooms) => {
    const { value } = event.target;
    setEditedRooms((prevRooms) => ({
      ...prevRooms,
      [user.user_id]: value,
    }));
    setRoom(value);
  };