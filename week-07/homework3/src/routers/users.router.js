import express from 'express'; // 웹 애플리케이션 프레임 워크 'express' import
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js'; // 인증 미들웨어 import
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // status 코드가 저장되어있는 HTTP_STATUS 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기

const usersRouter = express.Router(); // express의 라우터 인스턴스 생성

// get 메서드로 /me URL에 해당하는 접근을 처리, requireAccessToken 미들웨어로 AcessToken 검증
usersRouter.get('/me', requireAccessToken, (req, res, next) => {
  try {
    const data = req.user; // requireAccessToken에서 받은 req.user을 data변수에 담음

    // requireAccessToken 미들웨어를 통과한 정상적인 접근일때, 아래를 return
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.USERS.READ_ME.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

export { usersRouter }; // 외부 파일에서 사용할 수 있도록 설정
