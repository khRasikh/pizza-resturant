import React, { useState, useEffect } from 'react';

export const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    const isActiveTime = currentTime >= 12 && currentTime < 24;


    setIsChecked(isActiveTime);
  }, []);


  const [selectedKasset, setSelectedKasset] = useState('');

  const handleKassetChange = (e: any) => {
    const value = e.target.value;
    setSelectedKasset(value);
    sessionStorage.setItem('kasset', value); // Store selected Kasset in session storage
  };

  return (
    <div className="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in">
      <select className="w-44 p-2 border rounded-md bg-slate-200" onChange={handleKassetChange}>
        <option value="1">Kasset 1</option>
        <option value="2">Kasset 2</option>
      </select>
    </div>
  );
};

export default ToggleSwitch;
