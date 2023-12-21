import React, { useState, useEffect } from 'react';

export const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getHours();
    const isActiveTime = currentTime >= 12 && currentTime < 24; 

    setIsChecked(isActiveTime);
  }, []);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="relative inline-block w-14 mr-2 align-middle select-none transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer right-0 border-transparent transition-colors duration-200 ease-in ${isChecked ? 'right-0 border-green-400' : ''
          }`}
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <label
        htmlFor="toggle"
        className={`pl-4 toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in ${isChecked ? 'bg-green-400' : ''
          }`}
      >
        {!isChecked ? '1' : '2'}
      </label>
    </div>
  );
};

export default ToggleSwitch;
