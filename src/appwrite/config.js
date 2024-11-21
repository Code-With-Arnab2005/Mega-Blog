import conf from "../conf/conf.js";
import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    async createPost({ userId, title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//the url of the specific page
                {
                    title,
                    content,
                    userId,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("createPost Error: ", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {//**
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,//the url of the specific page
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("updatePost Error: ", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("deletePost Error: ", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("getPost Error: ", error);
            throw error;
        }
    }

    //now get all the documents of this collection id but only those which are status true
    async getAllPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active")//we have to make indexes in appwrite database to write query
                ]
            )
        } catch (error) {
            console.log("getAllPosts Error: ", error);
            throw error;
        }
    }

    //upload a file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,               
            )
        } catch (error) {
            console.log("uploadFile Error: ", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("deleteFile Error: ", error);
            throw error;
        }
    }

    async getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;