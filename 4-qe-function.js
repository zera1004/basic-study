// [함수 연습 문제]

// 문제 1: 두 숫자를 더하는 함수를 작성하고 결과를 출력하세요.

function sum(a, b) {
    console.log(a+b);
}

// 문제 2: 이름을 매개변수로 받아서 "안녕하세요, [이름]님!"을 출력하는 함수를 작성하세요.

function aaa(name) {
    console.log(`안녕하세요, ${name}님!`);
}

// 문제 3: 세 개의 숫자 중 가장 큰 수를 반환하는 함수를 작성하세요.

function bigNum(a,b,c) {
    return Math.max(a,b,c);
}

// 문제 4: 숫자를 매개변수로 받아 짝수인지 홀수인지 반환하는 함수를 작성하세요.

function aaa(num) {
    if (num % 2 == 0) {
        return "짝"
    } else {
        return "홀"
    }
}

// 문제 5: 배열을 매개변수로 받아 모든 요소를 출력하는 함수를 작성하세요.

function aaa(arrr) {
    for (let arr of arrr) {
        console.log(arr)
    }
}