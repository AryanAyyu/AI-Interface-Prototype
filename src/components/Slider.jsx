import { useState } from 'react';

const Slider = ({ 
  label, 
  min = 0, 
  max = 100, 
  step = 1, 
  value: externalValue, 
  onChange,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState(externalValue || min);
  
  const value = externalValue !== undefined ? externalValue : internalValue;
  
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    if (onChange) onChange(newValue);
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}: {value}
          </label>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        {...props}
      />
    </div>
  );
};

export default Slider;