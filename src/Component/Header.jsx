import React from "react";

function Header() {
  return (
    <>
      <div className="h-20 bg-slate-700 flex flex-row w-full justify-end items-center pr-4">
        <div className="flex justify-center items-center space-x-1.5">
          <p className="text-gray-300 text-xl">Novanectar</p>
          <img
            src="/logo.jpg"
            className="h-16 w-16 rounded-full"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Header;
