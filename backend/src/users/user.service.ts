import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/model/user.schema';
import * as bcrypt from 'bcrypt';
import { response } from 'express';

export type CreateUserDto = {
  readonly username: string;
  readonly password: string;
};

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {
    // const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, 10);

    const reqBody = {
      username: user.username,
      password: hash,
    };
    const createdUser = new this.userModel(reqBody);

    return createdUser.save();
  }

  async signin(user: User): Promise<any> {
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
      return user;
    }

    // const findUser = await this.userModel
    //   .findOne({ username: user.username })
    //   .exec();

    // console.log(findUser);
    // if (findUser) {
    //   const { password } = findUser;
    //   // console.log(await bcrypt.compare(user.password, password));
    //   if (bcrypt.compareSync(user.password, password)) {
    //     // console.log('logado');
    //     return {
    //       token: 'token',
    //     };
    //   }

    //   return response.status(HttpStatus.UNAUTHORIZED).json({
    //     message: 'user or password is wrong',
    //   });
    // }
    // console.log('nao logado');
    // return response.status(HttpStatus.UNAUTHORIZED).json({
    //   message: 'user or password is wrong',
    // });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
