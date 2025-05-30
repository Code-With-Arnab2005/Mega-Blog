import React, { useEffect, useState } from 'react';
import Container from './Container';
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';
import MyPostsLinks from './MyPostsLinks';

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState(null);
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        service.getUserPosts(userData?.user.$id)
            .then((userPosts) => {
                setUsername(userData.user.name)
                if (userPosts) {
                    setPosts(userPosts.documents);
                }
            })
    }, [userData])

    return (
        <div className='w-full py-8'>
            <Container>
                <div>
                    <h1 className="text-4xl font-bold mb-4">MY POSTS</h1>
                    <MyPostsLinks username={username} activeButton={"all-posts"} />
                    {posts.length === 0 && (
                        <Container>
                            <div className="text-4xl font-bold w-vw h-[50vh] shadow-xl flex justify-center items-center">
                                No posts
                            </div>
                        </Container>
                    )}
                    {posts.length > 0 && (
                        <div className='flex flex-wrap'>
                            {
                                posts.map((post) => (
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <PostCard {...post} />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </Container>
        </div>

    )
}

export default MyPost
