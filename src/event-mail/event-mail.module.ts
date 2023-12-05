import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/model/user.schema';

@Module({})
export class EventMailModule {

    @OnEvent('user.login')
    handleUserLoginEvent(user: any) {
    console.log('Inicio session', user);
    // Enviar email
    }
    

    @OnEvent('user.created')
    handleUserCreatedEvent(user: UserDocument) {
    console.log('_Event_USER_', user);
  // Enviar email
    }
}
