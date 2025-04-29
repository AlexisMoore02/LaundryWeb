import { pageStateActions} from '../actions/index';

const initialState = {
  activeTab: 1,
};

export const pageStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case pageStateActions.SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    default:
      return state;
  }
}; 