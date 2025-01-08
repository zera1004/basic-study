import { prisma } from '../utils/prisma.util.js';

class AuthRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  findUser = async (email) => {
    return await this.#orm.user.findUnique({ where: { email } });
  };

  signUp = async ({ email, password, name }) => {
    return await this.#orm.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  };
}

export default new AuthRepository(prisma);
