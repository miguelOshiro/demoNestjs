import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/model/user.schema';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService:JwtService,
        private readonly eventEmitter: EventEmitter2,
        @InjectModel(User.name) private readonly userModel:Model<UserDocument>
    ) {}

    /**
     * 
     * @param userLoginBody Iniciar Sesionn
     * @returns 
     */

    public async login(userLoginBody: LoginAuthDto) {
        const {password} = userLoginBody;

        const userExist = await this.userModel.findOne({email:userLoginBody.email});
        if(!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

        const isCheck = await compareHash(password, userExist.password);
        console.log('_____', isCheck);
        if(!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

        const userFlat = userExist.toObject();
        delete userFlat.password;
        //delete userExist.password;

        const payload = { id:userFlat._id }
        const token = this.jwtService.sign(payload);

        
        const data = {
            token,
            user:userFlat
        }
        this.eventEmitter.emit(
            'user.login',
            data
          );
        return data;
    }

    /**
     * Reg Usuario
     * @param userBody 
     * @returns 
     */

    public async register(userBody:RegisterAuthDto) {
        const { password, ...user } = userBody;

        const userParse = {
            ...user, password: await generateHash(password)
        }

        const newUser = await this.userModel.create(userParse);
        /** 
         * Enviar (Evento) Email
        */
        this.eventEmitter.emit(
            'user.created',
            newUser
          );


        return newUser;
    }
}
