import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import service from "../appwrite/config";
import Input from './Input';
import Select from './Select';
import Button from './Button';
import RTE from './RTE';

function PostFrom({ post }) {
    // console.log("postform post: ", post.featuredImage)
    // console.log("postForm post: ", post);
    // console.log(post?.title);
    // console.log(post?.content);
    // console.log(post?.slug);

    const slug = useParams();
    const [isUpdated, setIsUpdated] = useState(false);

    const { register, handleSubmit, control, watch, setValue, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const [imgurl, setImgurl] = useState("");

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    // const state = useSelector((state) => state)
    // console.log("state: ", state);

    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: slug.slug || "",
                content: post.content || "",
                status: post.status || "active",
            });
        }
    }, [post, reset]);


    const submit = async (data) => {
        if (post) {//in this case user want to update the post
            // console.log("post: ", post);
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
            if (file) {
                service.deleteFile(post.featuredImage)
            }
            const dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // console.log("else case")
            const file = await service.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                // console.log("userData: ", userData);
                // console.log("userId: ", userData.user.$id)
                const dbPost = await service.createPost({ ...data, userId: userData.user.$id });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(() => {
        if (post && isUpdated===false) {
            // console.log("postform post: ", post)
            service.getFilePreview(post.featuredImage).then((url) => {
                setImgurl(url);
            })
        }
    }, [post, isUpdated])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title,
                    { shouldValidate: true }
                ))
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue])
    // console.log("title: ", getValues("title"))

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap mb-3">
            <div className="w-2/3 px-2 py-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    onChange={() => {setIsUpdated(true)}}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                { isUpdated===false ? (post && (
                    <div className="w-full mb-4">
                        <img
                            src={imgurl}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )) : null}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 w-full"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-600" : undefined} className="w-full hover:bg-green-500">
                    {post ? "Update" : "Submit"}
                </Button>
                {/* <Button className="w-full mt-2 hover:bg-blue-500">Cancel</Button> */}
            </div>
        </form>
    );
}

export default PostFrom
