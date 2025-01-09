import { prisma } from '../utils/prisma.util.js';

class ResumeRepository {
  #orm;

  constructor(orm) {
    this.#orm = orm;
  }

  createResume = async ({ authorId, title, content }) => {
    return await this.#orm.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });
  };

  allResume = async ({ authorId, sort }) => {
    return await this.#orm.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });
  };

  detailResume = async ({ id, authorId }) => {
    return await this.#orm.resume.findUnique({
      where: { id: +id, authorId },
      include: { author: true },
    });
  };

  existedResume = async ({ id, authorId}) => {
    return await this.#orm.resume.findUnique({
      where: { id: +id, authorId },
    })
  }

  updateResume = async ({ id, authorId, title, content }) => {
    return await this.#orm.resume.update({
      where: { id: +id, authorId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });
  }

  deleteResume = async ({ id, authorId }) => {
    return await this.#orm.resume.delete({ where: { id: +id, authorId } });
  }
}

export default new ResumeRepository(prisma);
