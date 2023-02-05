import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import { UsersService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(user: User): Promise<any> {
    // const userCheck = await this.usersService.findOne(user.username);

    // console.log(userCheck);
  }

  async login(user: User): Promise<any> {
    const findUser = await this.userModel
      .findOne({ username: user.username })
      .exec();
    // console.log(findUser);
    // console.log(typeof findUser);

    const { password } = findUser;
    // console.log(password);
    // console.log(user.password);
    if (!bcrypt.compareSync(user.password, password)) {
      return null;
    } else {
      const payload = { username: user.username, userId: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
