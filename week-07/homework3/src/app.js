import express from 'express'; // 웹 애플리케이션 프레임 워크 'express' import
import { SERVER_PORT } from './constants/env.constant.js'; // env에 있는 SSERVER_PORT 가져오기
import { errorHandler } from './middlewares/error-handler.middleware.js'; // middleware에 있는 에러 핸들러 가져오기
import { HTTP_STATUS } from './constants/http-status.constant.js'; // constants에 있는 status코드 가져오기
import { apiRouter } from './routers/index.js'; // router들이 모여있는 index.js 가져오기

const app = express(); // express 인스턴스 생성

app.use(express.json()); // JSON 형식의 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true })); // URL 인코딩 형식의 데이터를 파싱하기 위한 미들웨어

// health-check로 get 요청시 status코드 200과 "I'm healthy."출력
app.get('/health-check', (req, res) => {
  return res.status(HTTP_STATUS.OK).send(`I'm healthy.`);
});

app.use('/api', apiRouter); // '/api' url로 접속시, apiRouter에 등록된 라우터일 경우, 처리를 하는 미들웨어 등록

app.use(errorHandler); // error를 처리하는 미들웨어

// express 애플리케이션을 실행하는 메서드
app.listen(SERVER_PORT, () => {
  console.log(`서버가 ${SERVER_PORT}번 포트에서 실행 중입니다.`);
});
