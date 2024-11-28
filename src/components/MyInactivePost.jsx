import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import { useSelector } from 'react-redux';
import Container from './Container';
import PostCard from './PostCard';
import MyPostsLinks from './MyPostsLinks';

const MyInactivePosts = () => {

  const [posts, setPosts] = useState([]);
  const [activeButton, setActiveButton] = useState("inactive-posts");
  const [username, setUsername] = useState(null);
  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    service.getUserInactivePosts(userData?.user.$id)
      .then((userPosts) => {
        if (userPosts) {
          setPosts(userPosts.documents);
          setUsername(userData.user.name)
        }
      })
  }, [])

  return (
    <div className='w-full py-8'>
      <Container>
        <div>
          <h1 className="text-4xl font-bold mb-4">MY POSTS</h1>
          <MyPostsLinks username={username} activeButton={"inactive-posts"} />
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

export default MyInactivePosts;
