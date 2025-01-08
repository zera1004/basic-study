import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import AuthRepository from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  HASH_SALT_ROUNDS,
} from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';

class AuthService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  signUp = async (authData) => {
    const { email, password, name } = authData;

    const existedUser = await this.#repository.findUser(email);

    if (existedUser) {
      const error = new Error(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
      error.status = HTTP_STATUS.CONFLICT;
      error.name = 'existedUser';
      throw error;
    }

    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    const data = await this.#repository.signUp({
      email,
      password: hashedPassword,
      name,
    });

    data.password = undefined;

    return data;
  };

  signIn = async (authData) => {
    const { email, password } = authData;

    const user = await this.#repository.findUser(email);

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      const error = new Error(MESSAGES.AUTH.COMMON.UNAUTHORIZED);
      error.status = HTTP_STATUS.UNAUTHORIZED;
      error.name = 'isPasswordMatched';
      throw error;
    }

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return accessToken;
  };
}

export default new AuthService(AuthRepository);
