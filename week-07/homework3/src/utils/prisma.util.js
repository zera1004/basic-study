import { PrismaClient } from '@prisma/client'; // @prisma/client 모듈의 PrismaClient import

// prismaClient 인스턴스 생성해 prisma 변수에 저장, export를 통해 외부에서 사용할 수 있도록 설정
export const prisma = new PrismaClient({
  // Prisma를 이용해 데이터베이스를 접근할 때, SQL을 출력해줍니다.
  log: ['query', 'info', 'warn', 'error'],

  // 에러 메시지를 평문이 아닌, 개발자가 읽기 쉬운 형태로 출력해줍니다.
  errorFormat: 'pretty',
}); // PrismaClient 인스턴스를 생성합니다.

try {
  await prisma.$connect(); // prisma 클라이언트를 이용해 데이터 베이스에 연결
  console.log('DB 연결에 성공했습니다.'); // 연결 성공 메시지
} catch (error) {
  console.error('DB 연결에 실패했습니다.', error); // error message
}
