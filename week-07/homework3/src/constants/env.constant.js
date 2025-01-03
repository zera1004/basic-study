// dotenv패키지의 config모듈 가져옴, dotenv.config()를 안써도 메서드 자동 호출
import 'dotenv/config';

export const SERVER_PORT = process.env.SERVER_PORT; // env파일에서 SERVER_PORT값 가져옴
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET; // env파일에서 ACCESS_TOKEN_SECRET값 가져옴
