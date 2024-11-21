import React from 'react'

function Logo({width='80px'}) {
  return (
    <div>
      <img src='/logo.png' className='rounded-full' alt="Logo" width={60}  />
    </div>
  )
}

export default Logo;