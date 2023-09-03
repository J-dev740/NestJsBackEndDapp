import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collection } from "mongoose";
export type UserDocument= User & Document;
@Schema({collection:"Contacts"})// name of our collection in db
export class User{
    @Prop()
    name:string
    @Prop()
    phone:number
    @Prop()
    CreatedAt:Date
}

export const UserSchema=SchemaFactory.createForClass(User)