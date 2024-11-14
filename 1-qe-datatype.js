// [데이터 타입 연습 문제]

// 문제 1: 자신의 이름과 나이를 변수에 저장하고 출력하세요.

let name = '김지웅';
let age = '25' // 98년생;
console.log(`이름: ${name} 나이: ${age}`);

// 문제 2: 불리언 값을 저장하는 변수를 만들고 출력하세요.

let aa = true;
console.log(aa);

// 문제 3: null과 undefined의 차이를 콘솔로 확인하세요.
// 힌트:
// var undefinedVar;
// var nullVar = null;
// 두 변수를 console.log로 출력하고, typeof 연산자를 사용하여 타입을 확인해보세요.

// null은 자바스크립트 오류로 객체로 나오고
// underfined는 underfined로 나옴

// 문제 4: 좋아하는 음식 3가지를 배열에 저장하고 첫 번째 음식을 출력하세요.

let fav = ['치킨', '피자', '햄버거'];
console.log(fav[0])

// 문제 5: 사람의 정보를 객체로 만들어 이름과 나이를 저장하고 출력하세요.

let person = {
    name: '김땡땡',
    age: '20',
}

console.log(`이름: ${person.name} 나이: ${person.age}`)