import Joi from 'joi'; // 데이터 유효성 검사를 위해 joi라이브러리 import
import { MESSAGES } from '../../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기

// joi.object로 유효성 검사 규칙 정의
const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }), // email은 문자열, 이메일 형식, 필수로 정의
  password: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
  }), // password는 문자열, 필수로 정의
});

// 로그인 검증 미들웨어 정의
export const signInValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
