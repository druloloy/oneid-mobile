import {io} from 'socket.io-client';
import config from './socket.config';
import apiConfig from './api.config';

const url = apiConfig.baseUrl + apiConfig.endpoints.patientQueueApi;

class SocketService {
  static init() {
    return io(url, config);
  }

  static connection(setConnected) {
    setConnected(true);
  }

  static disconnect(setConnected) {
    setConnected(false);
  }

  static getId(id, setUserId) {
    setUserId(id);
  }

  static fetchData(data, setData) {
    setData(data);
  }
}

export default SocketService;
