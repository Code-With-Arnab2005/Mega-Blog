import React from 'react'
import PostFrom from '../components/PostFrom'
import Container from '../components/Container'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import service from '../appwrite/config'

function UpdatePost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    // console.log("updatePost post: ", post);
    return (
        <div>
            <Container>
                <PostFrom post={post}/>
            </Container>
        </div>
    )
}

export default UpdatePost;
