import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUserService,
  getAllUser,
  deleteUser,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorHomeService,
  saveDetailDoctorService,
} from "../../services/userService";

import { toast } from "react-toastify";

export const fetchGender = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER,
      });
      let res = await getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderFail: ", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data1: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPosition = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("Position");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log("fetchPositionFail: ", e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data1: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRole = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleFail: ", e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data1: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("create user: ", res);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success !");
        dispatch(saveUserSuccess());
        dispatch(fetchUser());
      } else {
        dispatch(saveUserFail());
      }
    } catch (e) {
      dispatch(saveUserFail());
      console.log("createUserFail: ", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAIL,
});

export const fetchUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("All");

      if (res && res.errCode === 0) {
        //reverse() đảo thứ tự của mảng
        dispatch(fetchUserSuccess(res.user.reverse()));
      } else {
        dispatch(fetchUserFail());
      }
    } catch (e) {
      dispatch(fetchUserFail());
      console.log("fetchUserFail: ", e);
    }
  };
};

export const fetchUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const deleteUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(id);
      if (res && res.errCode === 0) {
        toast.success("Delete a new user success !");
        dispatch(deleteUserSuccess());
        dispatch(fetchUser());
      } else {
        toast.error("Delete a new user fail !");
        dispatch(deleteUserFail());
      }
    } catch (e) {
      dispatch(deleteUserFail());
      console.log("deleteUserFail: ", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const editUserStart = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(id);
      if (res && res.errCode === 0) {
        toast.success("Update a new user success !");
        dispatch(editUserSuccess());
        dispatch(fetchUser());
      } else {
        toast.error("Update a new user fail !");
        dispatch(editUserFail());
      }
    } catch (e) {
      dispatch(editUserFail());
      console.log("editUserFail: ", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTOR_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTOR_FAIL: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save info success !");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save info fail !!!!!!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      toast.error("Save info fail !");
      console.log("SAVE_DETAIL_DOCTOR_FAIL: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
      });
    }
  };
};
