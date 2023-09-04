import { Body, Controller, Get, Param, Post,Delete,Query } from '@nestjs/common';
import {Types as StreamTypes} from '@moralisweb3/streams';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import{ethers} from 'ethers';
import { User } from './schemas/user.schema';
// import { Query } from 'mongoose';
// const Abi= [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "contactInfo",
//           "type": "uint256"
//         }
//       ],
//       "name": "storeContact",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "contactNo",
//           "type": "uint256"
//         }
//       ],
//       "name": "Store",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "i_owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ]
const Abi=  
[
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "contactInfo",
        "type": "uint256"
      }
    ],
    "name": "contactRemoved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "contactInfo",
        "type": "uint256"
      }
    ],
    "name": "storeContact",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "contactNo",
        "type": "uint256"
      }
    ],
    "name": "RemoveContact",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "contactNo",
        "type": "uint256"
      }
    ],
    "name": "Store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "UserToContact",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "i_owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
const iface= new ethers.Interface(Abi)



@Controller('user')//every api routes inside this controller starts with /user/ route
export class UserController {
//we injected the userService into this class UserController since UserService is a provider as it is 
//decorated by the injector
//so we don't need to instanciate a class for it eg:
//const userService=new UserService()
//nestJs runtime does that for us

//Note:we can only use this UserService inside this module only
//to use comment service inside usermodule we must import it as a provider 
//inside the usermodule
    constructor(private readonly userService:UserService,
        private readonly commentService:CommentService
        ){    
    }



    @Get(':number')
    async getUser(@Param('number') phoneNumber:number):Promise<User>{
      console.log(phoneNumber)
      return this.userService.getUserByNumber(phoneNumber);
    }
    @Get()
    async getUsers():Promise<User[]>{
      return this.userService.getUsers()
    }

    @Delete()
    async deleteUser(@Query('name') name:string, @Query('phone') phone:number):Promise<User>{
      console.log('delete request received....')
      return this.userService.DeleteUser(name,phone)
    }
    // findAll(@Param('id') id:string){
    // //     return(
    // //         {
    // //             user:{
    // //                 id:id
    // //             }
    // //         }
    // //     )
    //     return (
    //         this.userService.findOne(id)
    //     )
    // }

    @Post()
    async create(@Body() body:StreamTypes.IWebhook){
        // return `this route is for posting a user ${body.name}`
        console.log('post request received...\n')
        // console.log(body.logs)
        // return 
        console.log('------------------------------------------------------------------------------->')
        if(!body.confirmed){
            // console.log(body)
            // if(body.abi[0].name=="removeContact"){
            //   console.log('removeContactEventEmitted.......')
            //   return
            
            const logData=body.logs[0].data
            const topic0=body.logs[0].topic0
            const decodedLog=iface.parseLog({
                topics:[topic0],
                data:logData

            })
            // console.log(decodedLog)
            console.log('------------------------------>')
            console.log(decodedLog.args[0])
            console.log(ethers.toNumber(decodedLog.args[1]))
            if(decodedLog.name=='contactRemoved'){
              console.log('contactRemoved Event emitted ...removing contact')
              // return this.userService.DeleteUser(decodedLog.args[0],ethers.toNumber(decodedLog.args[1]))
              return
            }else if(decodedLog.name=='storeContact'){
              console.log('store event emitted... storing details')
              return this.userService.createUser(decodedLog.args[0],ethers.toNumber(decodedLog.args[1]))
            }else{
              console.log('Oops ! something went wrong...try again')
            }
        }


        return body
    }
    // create(@Body() CreateUserDto:CreateUserDto){
    //     // return CreateUserDto
    //     console.log('post request received...')
    //     return (
    //         this.userService.create(CreateUserDto)
    //         )
    //     // return body
    // }

}
