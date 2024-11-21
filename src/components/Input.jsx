import React, { useId } from 'react'

const Input = React.forwardRef((
    {label,
    type = "text",
    className = "",
    onChange=null,
    ...props
}, ref) => {

    const id = useId();
    return (
      <div>
        {label &&  <label 
        htmlFor={id}
        className="inline-block mb-1 pl-1">
            {label} 
        </label>}

        <input
        onChange={onChange}
        className={`px-3 py-2 outline-none border-black rounded-lg ${className}`}
        type={type}
        ref={ref}
        {...props}
        id={id}
        />
      </div>
    )
})

export default Input
