import ApiService from './ApiService';
import TokenService from './TokenService';
import apiConfig from './api.config';

const getLoginInfo = () => {
  return ApiService.get('l');
};

const login = (mobileNumber, password) => {
  return ApiService.post('login/', {
    mobileNumber,
    password,
  });
};

const signup = (mobileNumber, password) => {
  return ApiService.post('signup/', {
    mobileNumber,
    password,
  });
};

const logout = () => {
  return ApiService.post('logout/', {
    headers: {
      'Content-Type': 'application/json',
      'set-cookie': `_sid=${TokenService.getLocalSession()}; _uid=${TokenService.getLocalUser()}`,
    },
  });
};

const getPersonalDetails = () => {
  return ApiService.get('d');
};

const getMedicalDetails = () => {
  return ApiService.get('m');
};

const getConsultations = () => {
  return ApiService.get('c');
};

const addPersonalDetails = data => {
  console.log(data);
  return ApiService.post('add_details/', data);
};

const addMedicalDetails = data => {
  return ApiService.post('add_medical', data);
};

const updateMedicalDetails = data => {
  return ApiService.post('update_medical', data);
};

const getId = () => {
  return ApiService.post('genId', {
    headers: {
      // cache control is forever
      'Cache-Control': 'max-age=31536000',
    },
  });
};

const getAppointments = () => {
  return ApiService.get('schedules', {
    headers: {
      // cache control is forever
      'Cache-Control': 'max-age=31536000',
    },
  });
};

const getVisits = () => {
  return ApiService.get('h', {
    headers: {
      // cache control is forever
      'Cache-Control': 'max-age=31536000',
    },
  });
};

const getSchedules = () => {
  return ApiService.get('schedule/', {
    baseURL: apiConfig.baseUrl + apiConfig.endpoints.adminApi,
    headers: {
      // cache control is forever
      'Cache-Control': 'max-age=31536000',
    },
  });
};

export default {
  login,
  logout,
  getLoginInfo,
  getPersonalDetails,
  getMedicalDetails,
  signup,
  addPersonalDetails,
  addMedicalDetails,
  updateMedicalDetails,
  getId,
  getConsultations,
  getAppointments,
  getVisits,
  getSchedules,
};
