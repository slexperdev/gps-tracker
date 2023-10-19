import { useState } from "react";
import { Constant } from "../Constant";

const useToken = () => {
  const getToken = () => {
    return localStorage.getItem(Constant.TOKEN);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem(Constant.TOKEN, userToken);
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
