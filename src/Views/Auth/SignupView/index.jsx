import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase.init";

import { TextField, Button } from "../../../Components";

export default function SignUpView() {
  const navigate = useNavigate();
  const [regState, setRegState] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (regState.password !== regState.repeat_password) {
      toast.error("Confirm password incorrect!, please enter correct password");
    } else {
      await createUserWithEmailAndPassword(
        auth,
        regState.email,
        regState.password
      )
        .then(() => {
          toast.success("User registered successfully!");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
    setIsLoading(false);
  };
  return (
    <div className="flex h-screen items-center justify-center lg:bg-gradient-to-r lg:from-gray-700 lg:to-gray-900 sm:bg-white sm:p-4 ">
      <div className="flex flex-col gap-3 lg:bg-white lg:p-10 rounded-lg">
        <p className="lg:text-4xl sm:text-2xl font-semibold">
          Create Your Account
        </p>

        <form
          action="/"
          className="flex flex-col gap-4 mt-4"
          onSubmit={onSubmit}
        >
          <TextField
            label="Email"
            name="email"
            placeholder="Email"
            type="email"
            value={regState.email}
            onChange={(e) =>
              setRegState({ ...regState, email: e.target.value })
            }
          />
          <TextField
            label="Password"
            name="password"
            placeholder="*********"
            type="password"
            minLength={6}
            maxLength={12}
            value={regState.password}
            onChange={(e) =>
              setRegState({ ...regState, password: e.target.value })
            }
          />
          <TextField
            label="Confirm Password"
            name="ConfirmPassword"
            placeholder="*********"
            type="password"
            minLength={6}
            maxLength={12}
            value={regState.repeat_password}
            onChange={(e) =>
              setRegState({ ...regState, repeat_password: e.target.value })
            }
          />

          <Button type="submit" title="Sign Up" loading={isLoading} />
          <p className="text-sm font-normal">
            Already have a account?{" "}
            <span className="text-cyan-700">
              <a href="/">Login</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
