import express from 'express'; // 웹 애플리케이션 프레임 워크 'express' import
import bcrypt from 'bcrypt'; // bcrypt라는 해싱 알고리즘 모듈 import, 단방향으로 원래 문자 복원 불가능
import jwt from 'jsonwebtoken'; // JWT를 생성하고 검증하는 데 사용되는 라이브러리 import
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // status 코드가 저장되어있는 HTTP_STATUS 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기
import { signUpValidator } from '../middlewares/validators/sign-up-validator.middleware.js'; // 회원가입 검증을 위한 middleware 가져오기
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js'; // 로그인 검증을 위한 middleware 가져오기
import { prisma } from '../utils/prisma.util.js'; // prisma 인스턴스 가져오기, 효율을 위해 재생성이 아닌 하나의 인스턴스를 만들어 가져옴
import {
  ACCESS_TOKEN_EXPIRES_IN, // access token exprie times
  HASH_SALT_ROUNDS, // bcrypt Hashing counts
} from '../constants/auth.constant.js'; // auth와 관련된 변수 가져오기
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js'; // jwt에 사용할 env에 저장된 비밀키 값 가져오기

const authRouter = express.Router(); // express의 라우터 인스턴스 생성

// post 메서드로 /sign-up URL에 해당하는 접근을 처리, signUpValidator 미들웨어로 회원가입 입력값 검증
authRouter.post('/sign-up', signUpValidator, async (req, res, next) => {
  try {
    const { email, password, name } = req.body; // req.body로 들어온 데이터에서 객체구조분해 할당으로 email, password, name 변수에 담기

    // user 테이블에 email값에 해당하는 user가 이미 존재하는지 확인을 위한 변수 선언과 값 저장
    const existedUser = await prisma.user.findUnique({ where: { email } });

    // 이메일이 중복된 경우
    // 중복된 사람이 있다면 아래와 같은 status코드와 message를 return한다.
    if (existedUser) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      });
    }

    // 가져온 password값을 bcrypt로 해싱한다.
    const hashedPassword = bcrypt.hashSync(password, HASH_SALT_ROUNDS);

    // prisma를 이용해 user 테이블에 데이터를 저장!
    const data = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // 사용자에게 메시지를 전달하기 전 password를 undefind를 시켜 보안을 높임
    data.password = undefined;

    // 위의 과정이 무사히 통과하였다면 아래와 같은 CREATED status코드와 message를 전달한다.
    return res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

// post 메서드로 /sign-in URL에 해당하는 접근을 처리, signIpValidator 미들웨어로 회원가입 입력값 검증
authRouter.post('/sign-in', signInValidator, async (req, res, next) => {
  try {
    const { email, password } = req.body; // req.body로 들어온 데이터에서 객체구조분해 할당을 통해 email, password 변수에 담기

    // user 변수에 prisma로 user 테이블에서 email값에 해당하는 Unique값을 담음
    const user = await prisma.user.findUnique({ where: { email } });

    // req.body로 받은 password값과 user의 password값 비교
    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    // password가 일치하지 않을경우 아래의 status와 message를 전송
    if (!isPasswordMatched) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      });
    }

    // payload변수에 user.id값 저장
    const payload = { id: user.id };

    // 클라이언트에 보낼 accessToken값을 jwt로 저장
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { // userId값과 비밀키값
      expiresIn: ACCESS_TOKEN_EXPIRES_IN, // access token 지속시간
    });

    // 위의 절차가 성공적으로 진행되었을때 아래의 status코드와 json데이터 전송
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
      data: { accessToken },
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

export { authRouter }; // 외부 파일에서 사용할 수 있도록 선언
