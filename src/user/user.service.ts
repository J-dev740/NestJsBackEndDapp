import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { Usersrepository } from './user.repository';
import { User } from './schemas/user.schema';
import { dateFormat } from 'highcharts';
//decorated by the Injectable decorator
//which means this service is now a provider which can be injected into other classes
@Injectable()
export class UserService {

    constructor(private readonly userRepository:Usersrepository){
 
    }

    async getUserByName(name:string):Promise<User>{
        return this.userRepository.findOne({ name })
    }
    async getUsers():Promise<User[]>{
        return this.userRepository.find({})
    }

    async createUser(name:string,phone:number,CreatedAt:Date=new Date()):Promise<User>{
        return this.userRepository.create({
            name,
            phone,
            CreatedAt
        })
    
    }
    async DeleteUser(name:string,phone:number):Promise<User>{
        return this.userRepository.findOneAndDelete({
            name,
            phone
        })
    }

    // async updateUser(name:string, userUpdates:UpdateUserDto):Promise<User>{
    //     return this.userRepository.findOneAndUpdate({name},userUpdates)
    // }


    // findOne(id:string){
    //     return ({
    //         id:id
    //     })

    // }

    // create(createUserDto:CreateUserDto){
    //     return "the user is being created "
    //     // return ((req,res)=>{
    //     //     res.status(200).send('received')
    //     // })
    // }
}
