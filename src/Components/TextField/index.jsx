import React from "react";

export const TextField = ({ label, name, ...rest }) => {
  return (
    <div className="flex flex-col gap-2 ">
      <label htmlFor={name} className="text-sm font-semibold">
        {label}
      </label>
      <input
        className="border border-gray-300 rounded-lg p-2 focus:outline-red-700"
        name={name}
        required
        {...rest}
      />
    </div>
  );
};
