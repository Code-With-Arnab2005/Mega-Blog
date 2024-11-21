import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import Container from '../components/Container';
import PostCard from '../components/PostCard';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        service.getAllPosts().then((post) => {
            if (post) {
                // console.log(posts.documents)
                setPosts(post.documents);
            }
        })
    }, [])
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-5xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
