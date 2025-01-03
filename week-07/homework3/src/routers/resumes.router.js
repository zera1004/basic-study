import express from 'express'; // 웹 애플리케이션 프레임 워크 'express' import
import { HTTP_STATUS } from '../constants/http-status.constant.js'; // status 코드가 저장되어있는 HTTP_STATUS 가져오기
import { MESSAGES } from '../constants/message.constant.js'; // 응답 message가 저장되어있는 MESSAGES 가져오기
// 이력서 생성 시 검증을 위한 미들웨어 가져오기
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { prisma } from '../utils/prisma.util.js'; // prisma 인스턴스 가져오기, 효율을 위해 재생성이 아닌 하나의 인스턴스를 만들어 가져옴
// 이력서 업데이트 검증 미들웨어 가져오기
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js';

const resumesRouter = express.Router();  // express의 router 인스턴스 생성

// 이력서 생성, post method를 통한 접근일 경우를 처리, createResumValidator로 검증
resumesRouter.post('/', createResumeValidator, async (req, res, next) => {
  try {
    const user = req.user; // resumesRouter로 들어오기전 거친 requireAccessToken에서 받은 req.user값을 user에 저장
    const { title, content } = req.body; // req.body에서 객체구조분해 할당을 통해 title, content 변수에 값 담기
    const authorId = user.id; // user의 id 값을 authorId 변수에 저장

    // prisma로 resume 테이블에 새로운 데이터를 생성 후 그 데이터를 data변수에 저장
    const data = await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });

    // 위의 과정들이 정상적으로 작동되었다면 아래의 status코드와 json데이터를 응답값으로 return
    return res.status(HTTP_STATUS.CREATED).json({
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.RESUMES.CREATE.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

// 이력서 목록 조회, get method를 통한 접근일 경우를 처리
resumesRouter.get('/', async (req, res, next) => {
  try {
    const user = req.user; // resumesRouter로 들어오기전 거친 requireAccessToken에서 받은 req.user값을 user에 저장
    const authorId = user.id; // user의 id 값을 authorId 변수에 저장

    let { sort } = req.query; // url에 query에서 sort값 추출

    // (?.: 옵셔널 체이닝: null이나 undefined일 경우 오류를 발생시키지 않고 undefined반환)
    // sort값이 없다면 undefined, 값이 있다면 소문자로 변환
    sort = sort?.toLowerCase();

    // sort 값이 'desc'나 'asc'가 아닐경우 'desc'로 내림차순 정렬 선택
    if (sort !== 'desc' && sort !== 'asc') {
      sort = 'desc';
    }

    // prisma로 resume 테이블에서 authorId에 맞는 값을 내림차순으로 작성자 정보도 추가하여 data 변수에 저장한다.
    let data = await prisma.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    // map함수로 재설정(authorName 부분을 추가해서 data 변경)
    data = data.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });

    // 위의 과정이 정상적으로 이루워졌을 경우, 아래와같은 status코드와 json 데이터를 return한다.
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

// 이력서 상세 조회, get method로 /:id URL을 통한 접근일 경우를 처리
resumesRouter.get('/:id', async (req, res, next) => {
  try {
    const user = req.user; // resumesRouter로 들어오기전 거친 requireAccessToken에서 받은 req.user값을 user에 저장
    const authorId = user.id; // user의 id 값을 authorId 변수에 저장

    const { id } = req.params; // url에서 받은 파라미터값을 객체구조분해할당을 통해 값을 저장

    // data변수에 prisma로 resume 테이블에서 id와 authorId에 맞는 값을 받아 저장한다.
    let data = await prisma.resume.findUnique({
      where: { id: +id, authorId },
      include: { author: true },
    });

    // data가 없을 경우(이력서 작성자 정보가 x), 아래의 status코드와 json데이터를 return 한다.
    if (!data) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    // data를 보기좋게 수정(authorName부분)
    data = {
      id: data.id,
      authorName: data.author.name,
      title: data.title,
      content: data.content,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    // 위의 과정이 정상적으로 통과했을 경우, 아래의 status코드와 json 데이터를 return 한다.
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

// 이력서 수정, put method(전체 수정)로 /:id URL을 통한 접근일 경우를 처리, updateResumeValidator 미들웨어 사용
resumesRouter.put('/:id', updateResumeValidator, async (req, res, next) => {
  try {
    const user = req.user; // resumesRouter로 들어오기전 거친 requireAccessToken에서 받은 req.user값을 user에 저장
    const authorId = user.id; // user의 id 값을 authorId 변수에 저장

    const { id } = req.params; // url에서 받은 파라미터값을 객체구조분해할당을 통해 값을 저장

    const { title, content } = req.body; // req.body에서 객체구조분해 할당을 통해 title, content 변수에 값 담기

    // prisma로 resume 테이블에 id,authorId에 맞는 값이 있는지 조회(이력서 존재 여부 확인)
    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    // existedResume이 존재하지 않을 경우, 아래의 status코드와 json데이터를 return
    if (!existedResume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    // 위의 절차를 통과했다면, prisma의 update메서드를 통해 resume테이블에서 id,autorId에 맞는 값을 수정한다.
    const data = await prisma.resume.update({
      where: { id: +id, authorId },
      data: {
        ...(title && { title }), // 동적으로 추가하는 방식, title값이 true(존재)일 경우 추가, {title: title값}이 반환
        ...(content && { content }),
      },
    });

    // 위의 과정이 정상적으로 통과되었을 때 아래의 status코드와 json데이터를 return
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.UPDATE.SUCCEED,
      data,
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

// 이력서 삭제, delete로 /:id URL을 통한 접근일 경우를 처리
resumesRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user; // resumesRouter로 들어오기전 거친 requireAccessToken에서 받은 req.user값을 user에 저장
    const authorId = user.id; // user의 id 값을 authorId 변수에 저장

    const { id } = req.params; // url에서 받은 파라미터값을 객체구조분해할당을 통해 값을 저장

    // prisma로 resume테이블에서 id, authorId값에 해당하는 데이터를 existedResume에 저장
    let existedResume = await prisma.resume.findUnique({
      where: { id: +id, authorId },
    });

    // existedResume 값이 없을 경우, 아래의 status코드와 json데이터를 return
    if (!existedResume) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
      });
    }

    // prisma delete 메서드로 id, authorId에 해당하는 데이터를 테이블에서 삭제하고 data변수에 값 저장
    const data = await prisma.resume.delete({ where: { id: +id, authorId } });

    // 위 과정이 정상적으로 진행되었다면 아래의 status코드와 json데이터를 return
    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.DELETE.SUCCEED,
      data: { id: data.id },
    });
  } catch (error) {
    next(error); // error를 next(error처리 미들웨어)로 전달
  }
});

export { resumesRouter }; // 외부 파일에서 resumesRouter를 사용 할 수 있도록 export 사용
