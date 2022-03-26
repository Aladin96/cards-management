import http from "./httpService";
import { token_name } from "./tokenService";

const apiEndpoint = `${http.apiUrl}/auth`;

export const config = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(token_name)}`,
    },
  };

  return config;
};

export const login = async (name, password) => {
  try {
    const { data } = await http.post(`${apiEndpoint}/login`, {
      name,
      password,
    });
    localStorage.setItem(token_name, data.token);
    return { status: true, type: "success" };
  } catch (err) {
    return { status: true, type: "danger", message: err.response.data.message };
  }
};

export const isAuth = async () => {
  const response = await http.get(`${apiEndpoint}/isAuth`, config);
  if (!response) return false;

  return response;
};

export const check = () => {
  return false;
};
