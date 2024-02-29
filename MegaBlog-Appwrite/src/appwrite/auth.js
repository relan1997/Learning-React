import {Client,Account,ID} from 'appwrite'
import conf from '../conf/conf'

export class AuthService {
    client=new Client();
    account

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){ // used for sign Up feature
        try{
            const userAcc = await this.account.create(ID.unique(),email,password,name);
            if(userAcc){  // is we have created a user then we will automatically login it without redirecting the new user to the login page   
                return this.login(userAcc.email,userAcc.password)
            }
            else return userAcc
        } catch(err){
            throw err;
        }
    }
    async login({email ,password}){ // used for the login of the user
        try{
            return await this.account.createEmailSession(email,password)
        } catch(err){
            return err;
        }
    }
    async getCurrentUser(){  //to know that if u are on the landing page , the r u logged in or not
        try{
            return await this.account.get(); //typically retrieves information about the currently authenticated user from the backend server
        } catch(err){
            console.log( err);
        }

        return null;
    }
    async logout(){
        try{
            await this.account.deleteSessions()
        } catch(err)
        {
            throw err;
        }
    }
}

const authService = new AuthService()

export default authService;