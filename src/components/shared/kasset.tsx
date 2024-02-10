import React, { useState, useEffect } from "react";

export const changeKasset = (value: string) => {
  // change kasset 1 to 2 and reverse
    sessionStorage.setItem("kasset", value);
    window.location.reload();
};

export const Kasset = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    const isActiveTime = currentTime >= 12 && currentTime < 24;

    setIsChecked(isActiveTime);
  }, []);

  const [selectedKasset, setSelectedKasset] = useState(sessionStorage.getItem("kasset") ?? "");

  const handleKassetChange = (e: any) => {
    const value = e.target.value;
    setSelectedKasset(value);
    sessionStorage.setItem("kasset", value);
  };

  return (
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
      <select
        className="w-22 p-2 border rounded-md bg-slate-200"
        onChange={handleKassetChange}
        value={selectedKasset} // Set the selected value here
      >
        <option value="1" className="px-2 py-2">
          Kasset 1
        </option>
        <option value="2" className="px-2 py-2">
          Kasset 2
        </option>
      </select>
    </div>
  );
};

export default Kasset;
