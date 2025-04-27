import { ERROR_CODES } from "../errorCodes";

export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_MODAL_DATA = "SET_MODAL_DATA";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const setError = (errorCode, errorData) => ({
  type: SET_ERROR,
  payload: {
    errorCode,
    errorData,
  },
});

export const clearError = () => ({
  type: CLEAR_ERROR,
}); 
export const setModalData = (modalData) => ({
  type: SET_MODAL_DATA,
  payload: modalData,
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const handleActionForError = (errorCode, navigate) => {
  if (errorCode === ERROR_CODES.INVALID_TOKEN) {
    navigate("/error");
    return null;
  }

  const errorMessages = {
    [ERROR_CODES.USER_NOT_EXIST_ADMIN]: "Пользователя не существует",
    [ERROR_CODES.INVALID_LOGIN_OR_PASSWORD_ADMIN]: "Неверный логин или пароль",
    [ERROR_CODES.MISSING_DATA_RECORDS]: "Данные не найдены",
    [ERROR_CODES.INVALID_DATE_OR_TIME]: "Неверно указана дата или время",
    [ERROR_CODES.INVALID_ROOM]: "Неверно указана комната",
    [ERROR_CODES.NETWORK_OR_INTERNAL_SERVER_ERROR]:
      "Упс! Произошла внутренняя ошибка. Перезагрузите страницу или обратитесь к администратору.",
  };

  const content =
    errorMessages[errorCode] || "Не удается связаться с сервером";

  return {
    title: "Ошибка",
    content,
  };
}; 

export const errorActions = {
  setError,
  clearError,
  setModalData,
  closeModal,
  handleActionForError,
}; 
