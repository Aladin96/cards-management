import axios from "axios";

const isAuth = async () => {
  let isAuth = false;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  try {
    await axios.get("http://localhost:5000/auth/isAuth", config);
    isAuth = true;
  } catch (err) {
    isAuth = false;
    localStorage.removeItem("authToken");
  }

  return isAuth;
};

export default isAuth;
