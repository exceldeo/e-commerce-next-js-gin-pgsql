import { useEffect } from 'react';

export default function InputSelect({
  label,
  name,
  children = null,
  inputHandler,
  value,
  inputClasses = '',
  error = false,
  inputClassesParent = '',
  labelClasses = 'text-qgray text-[13px] font-normal',
  options,
  ...rest
}) {
  useEffect(() => {}, [options]);

  return (
    <div className='input-com w-full'>
      {label && (
        <label
          className={`input-label mb-2 block  capitalize ${labelClasses || ''}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div
        className={`input-wrapper relative  w-full overflow-hidden border ${
          error ? 'border-qred' : 'border-qgray-border'
        } ${inputClassesParent || ''}`}
      >
        <select
          className={`input-field text-dark-gray w-full bg-white px-6 text-sm font-normal placeholder:text-sm focus:outline-none focus:ring-0 ${
            inputClasses || ''
          }`}
          name={name}
          id={name}
          onChange={inputHandler}
          value={value}
          {...rest}
        >
          {options.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {children && children}
      </div>
    </div>
  );
}
