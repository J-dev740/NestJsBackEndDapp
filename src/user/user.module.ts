import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommentService } from 'src/comment/comment.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Usersrepository } from './user.repository';
//in this usermodule we have to define our User schema in the imports
@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService,CommentService,Usersrepository]
})
export class UserModule {}
