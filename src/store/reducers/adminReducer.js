import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roleIds: [],
  positions: [],
  users: [],
  topDoctor: [],
  allDoctor: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER:
      const copyState = { ...state };
      copyState.isLoadingGender = true;
      console.log("check action gender start: ", copyState);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data1;
      state.isLoadingGender = false;
      console.log("check action gender success: ", state);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      console.log("check action gender fail: ", action);
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data1;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.isLoadingGender = false;
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roleIds = action.data1;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.isLoadingGender = false;
      state.roleIds = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      // console.log('check fetch user aaaaaaaaa: ', action)
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      state.topDoctor = [];
      return {
        ...state,
      };
      case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctor = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.allDoctor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default appReducer;
