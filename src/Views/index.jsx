import React from "react";

export default function UnknownView() {
  return (
    <div className="container flex h-screen items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <p className="text-[70px] font-bold text-gray-500">Oops!</p>
        <p className="text-lg font-normal uppercase">
          This page could not be found
        </p>
        <a href="/" className="bg-blue-500 p-2 rounded-lg text-white mt-4">
          Go To Homepage
        </a>
      </div>
    </div>
  );
}
