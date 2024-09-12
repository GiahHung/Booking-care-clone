import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (dataInput) => {
  return axios.put("/api/edit-user", dataInput);
};

const getAllCode = (inputData) => {
  return axios.get(`/api/allCode?type=${inputData}`);
};

const getTopDoctorHomeService = (limitInput) => {
  return axios.get(`/api/getTopDoctor?limit=${limitInput}`);
};

const getAllDoctorHomeService = () => {
  return axios.get(`/api/getAllDoctor`);
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/saveInfoDoctor", data);
};

const getDetailDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

export { handleLoginAPI, getAllUser, createNewUserService, 
  deleteUser, editUserService, getAllCode, getTopDoctorHomeService, 
  getAllDoctorHomeService, saveDetailDoctorService, getDetailDoctor };
