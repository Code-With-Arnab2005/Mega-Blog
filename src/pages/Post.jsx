import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import Container from '../components/Container';
import parse from "html-react-parser";
import Button from '../components/Button';

function Post() {

    const [post, setPost] = useState(null);
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate();
    const [imgurl, setImgurl] = useState("");

    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    // console.log("post: ", post);
                    // console.log("featured img: ", post.featuredImage);
                    service.getFilePreview(post.featuredImage).then((url) => {
                        // console.log("url: ", url)
                        setImgurl(url);
                    })
                    // console.log("featured image: ", post.featuredImage)
                    // console.log("image url: ", imgurl)
                }
                else navigate("/")
            })
        } else navigate("/");
    }, [slug, navigate])


    const isAuthor = post && userData ? post.userId === userData.user.$id : false;

    // console.log("post: ", post);
    // console.log("postid: ", post.userId);
    // console.log("userdata id: ", userData.user.$id);


    const deletePost = async () => {
        if (slug) {
            const status = await service.deletePost(slug)
            if (status) {
                service.deleteFile(post.featuredImage);
                navigate("/");
            }
        }
    }
    // console.log("isauthor: ", isAuthor);

    return post ? (
        <div className="py-8">
            <Container>
                <div className="mt-10 w-full flex justify-center mb-4 relative border border-black rounded-xl p-2">
                    <img src={imgurl} alt={post.title} className="rounded-xl" />
                </div>

                {isAuthor && (
                    <div className="mt-12 mr-5 absolute right-10 top-12">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-600" className="mr-3 hover:bg-green-500">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-600" className="hover:bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null
}

export default Post
