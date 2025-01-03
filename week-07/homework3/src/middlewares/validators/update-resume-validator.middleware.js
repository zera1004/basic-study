import Joi from 'joi'; // 데이터 유효성 검사를 위해 joi라이브러리 import
import { MESSAGES } from '../../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기
import { MIN_RESUME_LENGTH } from '../../constants/resume.constant.js'; // password 최소 길이 변수 가져오기

// joi.object로 유효성 검사 규칙 정의
const schema = Joi.object({
  title: Joi.string(), // title을 문자열로 정의
  content: Joi.string().min(MIN_RESUME_LENGTH).messages({
    'string.min': MESSAGES.RESUMES.COMMON.CONTENT.MIN_LENGTH,
  }), // content를 문자열, 최소길이 정의
})
  .min(1) // 최소 하나의 프로퍼티를 가져야 함을 정의
  .messages({
    'object.min': MESSAGES.RESUMES.UPDATE.NO_BODY_DATA,
  });

// 이력서 업데이트 검증 미들웨어 정의
export const updateResumeValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
