import Joi from 'joi'; // 데이터 유효성 검사를 위해 joi라이브러리 import
import { MESSAGES } from '../../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js'; //resume 최소길이 가져오기

// joi.object로 유효성 검사 규칙 정의
const schema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': MESSAGES.RESUMES.COMMON.TITLE.REQUIRED,
  }), // title은 문자열, 필수로 설정
  content: Joi.string().min(MIN_RESUME_LENGTH).required().messages({
    'any.required': MESSAGES.RESUMES.COMMON.CONTENT.REQUIRED,
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }), // content는 문자열, 최소길이 정의, 필수로 설정
});

// 이력서 검증 미들웨어 정의
export const createResumeValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
