import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.usersRepository.create({ username, password: hashedPassword });
        try{

            await this.usersRepository.save(user);
        }
        catch(error){
            if (error.code === '23505'){
                throw new ConflictException(`Username ${username} already exists`);
            }
            else {
                throw new InternalServerErrorException();
            }
        }

    }

    async signIn(authCredentialsDto:AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({where: { username: username }})

        console.log(user)

        if (user && (await bcrypt.compare(password, user.password))){
            return 'Success'
        }
        else{
            throw new UnauthorizedException('Not authorized to access')
        }
    }

}
