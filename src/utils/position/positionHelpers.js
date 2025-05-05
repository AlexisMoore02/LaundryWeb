import { handleActionForError, setModalData } from "store/actions/errorActions";

const MY_API = process.env.REACT_APP_USER_API;

export const fetchLaundryData = (
  fetchData,
  setLaundryValues,
  setLoading,
  dispatch,
  navigate
) => {
  setLoading(true);
  fetchData({
    url: `${MY_API}/get_all_user_position`,
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
export const handleRequestPosition = async () => {
  // TO DO REQUEST
  // `${MY_API}/get_id_user_position?user_id=${userId}`,
};
export const handlePositionChangeStart = async (user, setEditedRooms, room) => {
  // TO DO REQUEST
  // `${MY_API}/new_room?user_id=${user.user_id}&room=${room}`,
  // `${MY_API}/get_usr_by_id?user_id=${user.user_id}`
};
export const handlePositionChange = (
  event,
  user,
  setPositions,
  setEditedPositions
) => {
  const { value } = event.target;
  setEditedPositions((prevPositions) => ({
    ...prevPositions,
    [user.user_id]: value,
  }));
  setPositions(value);
};
