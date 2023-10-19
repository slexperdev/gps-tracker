import React, { useEffect, useState } from "react";
import { Button, TextField } from "../../../Components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.init";

import useToken from "../../../Hooks/UseToken";

export default function LoginView() {
  const navigate = useNavigate();
  const { setToken, token } = useToken();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthenticate = () => {
      if (token) {
        navigate("/");
      }
    };
    checkAuthenticate();
  }, [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await signInWithEmailAndPassword(
      auth,
      loginState.email,
      loginState.password
    )
      .then((userCredentials) => {
        console.log(userCredentials);
        const token = userCredentials.user.accessToken;
        setToken(token);
      })
      .catch((error) => {
        toast.error(error.message);
      });

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen items-center justify-center lg:bg-gradient-to-r lg:from-gray-700 lg:to-gray-900 sm:bg-white sm:p-4 ">
      <div className="flex flex-col gap-3 lg:bg-white lg:p-10 rounded-lg">
        <p className="lg:text-4xl sm:text-2xl font-semibold">GPS Tracker </p>
        <p className="text-sm font-thin text-gray-700">
          Please login with your email address and password
        </p>
        <form
          action="/dashboard"
          className="flex flex-col gap-4 mt-4"
          onSubmit={onSubmit}
        >
          <TextField
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
            value={loginState.email}
            onChange={(e) =>
              setLoginState({ ...loginState, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            name="password"
            placeholder="*********"
            type="password"
            minLength={6}
            maxLength={12}
            value={loginState.password}
            onChange={(e) =>
              setLoginState({ ...loginState, password: e.target.value })
            }
          />

          <Button type="submit" title="Login" loading={isLoading} />
          <p className="text-sm font-normal">
            Don't you have a account?{" "}
            <span className="text-cyan-700">
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
