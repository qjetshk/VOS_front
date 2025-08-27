import React from "react";

function Avatar({ width = 40, fz = 18, transition = false, name }) {
  return (
    <div
      className={`bg-lgray ${
        transition ? "transition duration-300 hover:bg-blue" : ""
      } text-white rounded-full aspect-square flex items-center justify-center`}
      style={{
        width: `${width}px`,
        fontSize: `${fz}px`,
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default Avatar;
