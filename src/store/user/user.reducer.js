import  {USER_ACTION_TYPES}  from "./user.types";

export const INITIAL_STATE = {
  currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, //whatever in the previous state give me all and whatever is after this will be overwrite.
        currentUser: payload
      };
    default:
      return state;
  }
};