import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import ResumeService from '../services/resumes.service.js';

class ResumeController {
  #service;

  constructor(service) {
    this.#service = service;
  }

  createResume = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      let data = await this.#service.createResume({
        title,
        content,
        authorId,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  allResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      let { sort } = req.query;

      let data = await this.#service.allResume({ authorId, sort });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  detailResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      let data = await this.#service.detailResume({ authorId, id });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const { title, content } = req.body;

      let data = await this.#service.updateResume({
        id,
        authorId,
        title,
        content,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      let data = await this.#service.deleteResume({ id, authorId });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: { id: data.id },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new ResumeController(ResumeService);