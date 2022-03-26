import axios from "axios";

export const apiUrl2 = "http://139.162.146.174:5000";

export const apiUrl = "http://localhost:5000";

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  apiUrl,
};

export default httpService;
