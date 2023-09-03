import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentService {

    findUserComments(userId:string){
        return "these are the comments of the user "
    }
}
