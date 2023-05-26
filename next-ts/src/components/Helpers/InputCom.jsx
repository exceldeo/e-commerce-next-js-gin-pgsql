export default function InputCom({
  label,
  type,
  name,
  placeholder = '',
  children = null,
  inputHandler,
  value,
  inputClasses = '',
  error = false,
  inputClassesParent = '',
  labelClasses = 'text-qgray text-[13px] font-normal',
  ...rest
}) {
  return (
    <div className='input-com  w-full'>
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
        <input
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
          className={`input-field text-dark-gray w-full bg-white px-6 text-sm font-normal placeholder:text-sm focus:outline-none focus:ring-0 ${
            inputClasses || ''
          }`}
          type={type}
          id={name}
          {...rest}
        />
        {children && children}
      </div>
    </div>
  );
}
