import { Controller, Body, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}
    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const{ username, password } = authCredentialsDto
        console.log(`controller -> ${username},${password}`)
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string>{
        return this.authService.signIn(authCredentialsDto)
    }
}
