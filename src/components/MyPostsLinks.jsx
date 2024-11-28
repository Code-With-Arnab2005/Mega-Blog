import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';


const MyPostsLinks = ({username, activeButton}) => {

    return (
        
        <div className='flex gap-3 justify-start items-center mb-4'>
            <Link
                to={`/my-posts/${username}`}>
                <Button
                    bgColor={activeButton === 'all-posts' ? 'bg-blue-500' : 'bg-white'}
                    textColor={activeButton === 'all-posts' ? 'text-white' : 'text-black'}
                    className="hover:bg-gray-300 hover:text-black border-2 border-black font-bold rounded-3xl">
                    all posts
                </Button>
            </Link>
            <Link
                to={`/my-posts/${username}/active-posts`}>
                <Button
                    bgColor={activeButton === 'active-posts' ? 'bg-blue-500' : 'bg-white'}
                    textColor={activeButton === 'active-posts' ? 'text-white' : 'text-black'}
                    className="hover:bg-gray-300 hover:text-black border-2 border-black font-bold rounded-3xl">
                    active posts
                </Button>
            </Link>
            <Link
                to={`/my-posts/${username}/inactive-posts`}>
                <Button
                    bgColor={activeButton === 'inactive-posts' ? 'bg-blue-500' : 'bg-white'}
                    textColor={activeButton === 'inactive-posts' ? 'text-white' : 'text-black'}
                    className="hover:bg-gray-300 hover:text-black border-2 border-black font-bold rounded-3xl">
                    inactive posts
                </Button>
            </Link>
        </div>
    )
}

export default MyPostsLinks
