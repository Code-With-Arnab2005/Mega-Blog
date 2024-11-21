import conf from "../conf/conf.js";
import {Account, Client, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
    }

    async createAccount({email, name, password}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //if account created login the user
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login({email, password}) {
        try{
            const promise = await this.account.createEmailPasswordSession(email, password);
            console.log("login: ", promise);
            return promise;
        } catch(err){
            console.log(err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            const res = await this.account.get();            
            return res;
        } catch (error) {
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;