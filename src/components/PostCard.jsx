import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/config';

function PostCard({ $id, title, featuredImage }) {
  // console.log("featuredImage: ", featuredImage);
  // console.log("image url: ", service.getFilePreview(featuredImage));
  const [imgurl, setImgurl] = useState("");
  useEffect(() => {
    service.getFilePreview(featuredImage).then((url) => {
      setImgurl(url);
    })
  }, [])
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 hover:bg-gray-300 transition-all duration-200'>
        <div className='w-full justify-center mb-4'>
          <img src={imgurl} alt={title}
            className='rounded-xl' />

        </div>
        <h2
          className='text-xl font-bold'
        >{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
