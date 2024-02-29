import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try{
            return await this.databases.createDocument(  //used for creating a post on the blog website
                 conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                 slug, // typically a unique identifier or a user-friendly URL for the post being created. It's commonly derived from the title of the post and is used to create a URL that uniquely identifies the post.
                 {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                 }
            )
        } catch(err)
        {
            throw err;
        }
    }
    async updatePost(slug,{title,content,featureImage,status}){ //used for updating a blog Post on the blog website
        try{
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
        } catch(err){
            throw err;
        }
    }  // featureImage mai hum image ki id hi pass karenge
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
    async getPost(slug){ 
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch(err)
        {
            throw err;
        }
    }
    async getPosts(queries =[Query.equal("status","active")]){ //queries here is only a variable main kaam woh array ke inputs determine karenge
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch(err){
            throw err;
        }
    }
    //file upload service
    
    async uploadFile(file){
        try{
            return await this.bucket.createFile(  // the besides written function is used to add a multimedia file in the bucket that has been defined in the database on appwrite
                conf.appwriteBucketId,
                ID.unique(),
                file  //the file parameter that you passed will be copy pasted here
            )
        } catch(err){
            throw err;
            return false;
        }
    }
    async deleteFile(fileId){
        try{    
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )   
            return true;
        }catch(err){
            throw err;
            return false;
        }
    }
    async getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
};
const service=new Service();
export default service;