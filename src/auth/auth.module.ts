import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    // JwtModule.register({
    //   global: true,
    //   signOptions: { expiresIn: '4d' },
    //   secret: process.env.JWT_SECRET,

    // }),
    JwtModule.registerAsync({
      useFactory:() => {
        console.log('____JwtModule_____', process.env.JWT_SECRET)
        return {
          signOptions: { expiresIn: '4d' },
          secret: process.env.JWT_SECRET,
        }
      }
    }),
    MongooseModule.forFeature([
      { name:User.name, schema:UserSchema }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
