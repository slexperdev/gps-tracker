import { Spinner } from "@material-tailwind/react";
import React from "react";

export const Button = ({ loading, title, ...rest }) => {
  return (
    <button
      className="border-2 border-red-700 p-2 rounded-lg text-black focus:bg-red-700 focus:text-white w-[110px] flex justify-center items-center"
      {...rest}
    >
      {loading ? <Spinner className="h-6 w-6" color="white" /> : title}
    </button>
  );
};
