import { Controller, Get, Post, Body, Param, NotFoundException} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    messagesService: MessagesService;

    constructor(){
        //Dont do this on real app
        this.messagesService = new MessagesService;
    }

    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }

    @Post()
    createMessages(@Body() body: CreateMessageDto){
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessages(@Param('id') id: string){
        const message = await this.messagesService.findOne(id);

        if(!message){
            throw new NotFoundException('Message not found');
        }

        return message;
    }
}
