import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class Usersrepository{
    //userModel is of type UserDocument which is a union btween user and document model of mongodb
    constructor(@InjectModel(User.name) private userModel:Model<UserDocument>) {
        
    }

    async findOne(userFilterQuery:FilterQuery<User>):Promise <User>{
        return this.userModel.findOne(userFilterQuery);
    }
    async find(usersFilterQuery:FilterQuery<User>):Promise <User[]>{
        return this.userModel.find(usersFilterQuery)
    }
//query to create a new user
    async create(user:User):Promise<User>{
        const newUser=new this.userModel(user)
        return newUser.save({
            timestamps:true
        })
    }

    async findOneAndUpdate(userFilterQuery:FilterQuery<User>, user:Partial<User>):Promise<User>{
        return this.userModel.findOneAndUpdate(userFilterQuery,user)
    }
    async findOneAndDelete(userFilterQuery:FilterQuery<User>):Promise<User>{
        return this.userModel.findOneAndDelete(userFilterQuery)
    }
}