const environment = process.env.NODE_ENV;

const endpoints = {
  patientApi: '/api/v1/patient/',
  adminApi: '/api/v1/admin/',
  patientQueueApi: '/live_patient',
};

const BASE_URL = {
  development: 'http://localhost:5000',
  production: 'https://oneid.up.railway.app',
};

module.exports = {
  baseUrl: BASE_URL[environment],
  endpoints,
};
