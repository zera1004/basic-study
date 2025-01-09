import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ResumeRepository from '../repositories/resumes.repository.js';
import { prisma } from '../utils/prisma.util.js';

class ResumeService {
  #repository

  constructor(repository) {
    this.#repository = repository
  }

  createResume = async(resumeData) => {
    const { title, content, authorId } = resumeData;

    const data = await this.#repository.createResume({ authorId, title, content })

    return data;
  }

  allResume = async(resumeData) => {
    let { authorId, sort } = resumeData;

    console.log(sort)
    sort = sort?.toLowerCase();

    if (sort !== 'desc' && sort !== 'asc') {
      sort = 'desc';
    }

    let data = await this.#repository.allResume({authorId, sort});

    data = data.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });

    return data;
  }

  detailResume = async(resumeData) => {
    const { authorId, id } = resumeData;

    let data = await this.#repository.detailResume({id, authorId})

    if (!data) {
      const error = new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      error.name = 'existedResume';
      throw error;
    }

    data = {
      id: data.id,
      authorName: data.author.name,
      title: data.title,
      content: data.content,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return data;
  }

  updateResume = async(resumeData) => {
    const { authorId, id, title, content } = resumeData;

    let existedResume = await this.#repository.existedResume({id, authorId});

    if (!existedResume) {
      const error = new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      error.name = 'existedResume';
      throw error;
    }

    const data = await this.#repository.updateResume({ id, authorId, title, content })

    return data;
  }

  deleteResume = async(resumeData) => {
    const { authorId, id } = resumeData;

    let existedResume = await this.#repository.existedResume({id, authorId});

    if (!existedResume) {
      const error = new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
      error.status = HTTP_STATUS.NOT_FOUND;
      error.name = 'existedResume';
      throw error;
    }

    const data = await this.#repository.deleteResume({ id: +id, authorId });

    return data;
  }
}

export default new ResumeService(ResumeRepository);