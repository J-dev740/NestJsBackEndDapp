import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';
// import {MongooseModule} from "../node_modules/@nestjs/mongoose-master"
import{MongooseModule} from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:".env", 
    isGlobal:true
  }),
  MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


//controllers we define the api route
//services define the logic for actions along each route