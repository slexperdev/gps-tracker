import React, { useEffect, useState } from "react";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { removeFromLocalStorage } from "../../Util/Storage";
import { Constant } from "../../Constant";
import { auth } from "../../firebase.init";

import { AlertDialog } from "../Alert";

export const Navbar = () => {
  const navigate = useNavigate();

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const logout = () => {
    setOpenDeleteAlert(true);
  };

  const handleSubmitLogout = async () => {
    await signOut(auth)
      .then(() => {
        console.log("Sign out successfully!");

        setOpenDeleteAlert(false);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
    await removeFromLocalStorage(Constant.TOKEN);
  };

  return (
    <nav className="w-full h-20  text-white">
      <div className="bg-red-700 h-16">
        <div className="float-right flex flex-row h-full gap-8 px-5 items-center">
          <div className="self-center">
            <Link className="flex gap-2 cursor-pointer hover:text-black" to="/">
              <UserCircleIcon width={20} />
              <p className="text-md font-thin ">{authUser?.email}</p>
            </Link>
          </div>

          <div className="self-center">
            <a
              className="flex gap-2 cursor-pointer hover:text-black"
              onClick={logout}
            >
              <ArrowRightOnRectangleIcon width={20} />
              <p className="text-md font-thin">Logout</p>
            </a>
          </div>
        </div>
      </div>
      <AlertDialog
        open={openDeleteAlert}
        setOpenDeleteAlert={setOpenDeleteAlert}
        title="Alert!"
        message="Do you want to logout?"
        handleSubmit={handleSubmitLogout}
      />
    </nav>
  );
};
