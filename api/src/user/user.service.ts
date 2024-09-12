import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { hash, verify } from 'argon2'
import { jwtExpiresEnv } from 'src/constants/constants'
import { Repository } from 'typeorm'
import { AuthUserDto } from './dto/auth-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async auth(authUserDto: AuthUserDto) {
    const existedUser = await this.userRepository.findOne({
      where: {
        login: authUserDto.login,
      },
    });

    if (existedUser) {
      const isPasswordMatch = await verify(
        existedUser.password,
        authUserDto.password,
      );

      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid input');
      }

      const { accessToken } = await this.getAccessToken(existedUser);

      return this.returnUserWithToken(existedUser, accessToken);
    }

    const user = await this.userRepository.save({
      login: authUserDto.login,
      password: await hash(authUserDto.password),
    });

    const { accessToken } = await this.getAccessToken(user);

    return this.returnUserWithToken(user, accessToken);
  }

  private async getAccessToken(user: User) {
    const data = this.returnTokenUserFields(user);

    const accessToken = this.jwtService.sign(data, {
      expiresIn: this.configService.get(jwtExpiresEnv),
    });

    return { accessToken };
  }

  private returnTokenUserFields(user: User) {
    return {
      id: user.id,
      login: user.login,
    };
  }

  private returnUserWithToken(user: User, accessToken: string) {
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      accessToken: accessToken,
    };
  }
}
