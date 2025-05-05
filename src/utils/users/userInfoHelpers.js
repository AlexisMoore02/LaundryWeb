export const handleUserByName = async () => {
  // TO DO REQUEST
  // `${MY_API}/get_usr_by_name?first_name=${firstName}&last_name=${lastName}`
};
export const handleUserId = async () => {
  // TO DO REQUEST
  // `${MY_API}/get_usr_by_id?user_id=${userId}`
};
export const handleBanToggle = async (userId, currentBanStatus) => {
  // TO DO REQUEST
  // `${MY_API}${endpoint}?user_id=${userId}`
  // `${MY_API}/get_usr_by_id?user_id=${userId}
};
export const handleLastDate = async (value, row, setDeleteModalData) => {
  setDeleteModalData({
    isOpen: true,
    room: row.room,
    user_id: value,
    date: row.date,
  });
  // TO DO REQUEST
  // `${MY_API}/delete_last_date?user_id=${user_id}`
  // `${MY_API}/get_usr_by_id?user_id=${user_id}`
};
export const handleRoomChangeStart = async (user, setEditedRooms, room) => {
  // TO DO REQUEST
  //   `${MY_API}/new_room?user_id=${user.user_id}&room=${room}`
  // `${MY_API}/get_usr_by_id?user_id=${user.user_id}`
};
export const handleRoomChange = (event, user, setRoom, setEditedRooms) => {
  const { value } = event.target;
  setEditedRooms((prevRooms) => ({
    ...prevRooms,
    [user.user_id]: value,
  }));
  setRoom(value);
};
