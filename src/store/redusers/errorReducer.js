import { errorActions } from "../actions/index";

const initialState = {
  errorCode: null,
  errorData: null,
  modalData: {
    isOpen: false,
    title: "",
    content: "",
  },
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case errorActions.SET_ERROR:
      return {
        ...state,
        errorCode: action.payload.errorCode,
        errorData: action.payload.errorData,
      };
    case errorActions.SET_MODAL_DATA:
      return {
        ...state,
        modalData: {
          isOpen: true,
          title: action.payload.title,
          content: action.payload.content,
        },
      };
    case errorActions.CLOSE_MODAL:
      return {
        ...state,
        modalData: {
          isOpen: false,
          title: "",
          content: "",
        },
      };
    case errorActions.CLEAR_ERROR:
      return initialState;

    case errorActions.CLEAR_ERROR:
      return initialState;
    default:
      return state;
  }
};
