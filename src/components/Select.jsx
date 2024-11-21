import React, { forwardRef, useId } from 'react'

const Select = ({
  options = [],
  label,
  className = "",
  ...props
}, ref) => {

  const id = useId();
  return (
    <div>
      {label && <label htmlFor={id}></label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-1 border border-black rounded-lg text-xl mb-4 text-center ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className='w-full'>
            {option}
          </option>

        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select);
