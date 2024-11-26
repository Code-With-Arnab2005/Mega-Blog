import React, { useEffect, useState } from 'react';
import Container from './Container';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';


const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData)

    const getPosts = async () => {
        
    }

    useEffect(() => {
        if(userData){
            service.getUserPosts(userData.user.$id)
            .then((userPosts) => {
                if(userPosts){
                    setPosts(userPosts.documents);
                }
            })
        }
    }, [])
    console.log(posts)

    if(posts.length === 0) return (
        <Container>
            <div className="text-4xl font-bold w-vw h-[50vh] shadow-xl flex justify-center items-center">
                No posts
            </div>
        </Container>
    )
    else return (
        <div className='w-full py-8'>
            <Container>
                <div>
                    <h1 className="text-4xl font-bold mb-4">MY POSTS</h1>
                    <div className='flex flex-wrap'>
                        {
                            posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />
                                </div>                                                                    
                            ))
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default MyPost
