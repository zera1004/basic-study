import Joi from 'joi'; // 데이터 유효성 검사를 위해 joi라이브러리 import
import { MESSAGES } from '../../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js'; // password 최소 길이 변수 가져오기

// joi.object로 유효성 검사 규칙 정의
const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }), // email을 문자열, 이메일, 필수로 정의
  password: Joi.string().required().min(MIN_PASSWORD_LENGTH).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
    'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
  }), // password를 문자열, 필수, 최소길이 정의
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }), // password검증을 문자열, 필수, password값과 동일함으로 정의
  name: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQURIED,
  }), // name을 문자열, 필수로 정의
});

// 회원가입 검증 미들웨어 정의
export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
