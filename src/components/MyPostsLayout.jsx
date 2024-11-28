import React from 'react';
import { Outlet } from 'react-router-dom';

const MyPostsLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default MyPostsLayout
