import express from 'express'; // express 웹 애플리케이션 프레임 워크 import
import { authRouter } from './auth.router.js'; // auth.router import
import { usersRouter } from './users.router.js'; // users.router import
import { resumesRouter } from './resumes.router.js'; // resumes.router import
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js'; // 인증 미들웨어 import

const apiRouter = express.Router(); // express의 router 인스턴스 생성

apiRouter.use('/auth', authRouter); // /auth 경로에 대한 미들웨어 등록
apiRouter.use('/users', usersRouter); // /users 경로에 대한 미들웨어 등록
apiRouter.use('/resumes', requireAccessToken, resumesRouter); // /resumes 경로에 대한 미들웨어 등록

export { apiRouter }; // 외부에서 apiRouter를 사용할 수 있도록 설정