//Dto implies data transfer object

import { IsEmail, IsNumberString, IsString } from "class-validator";

export class CreateUserDto{
    // @IsString()
    name:string;

    
    // @IsEmail()
    email:string;

    // @IsNumberString() 
    phone:string;
    //we expect these these three objects from the body of the post request

}