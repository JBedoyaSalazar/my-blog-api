import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if(!user){
        throw new UnauthorizedException('credentials not valid')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('credentials not valid')
    }

    return user;
  }
}
