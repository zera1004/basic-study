// [조건문 연습 문제]

// 문제 1: 숫자를 입력받아 짝수인지 홀수인지 출력하세요.

function number(num) {
    if (num % 2 == 0) {
        console.log("짝수");
    } else {
        console.log("홀수");
    }
}

// 문제 2: 점수를 입력받아 학점을 출력하세요.
// 90점 이상 A, 80점 이상 B, 70점 이상 C, 그 외 D

function S(score) {
    if (score >= 90) {
        console.log("A");
    } else if (score >= 80) {
        console.log("B");
    } else if (score >= 70) {
        console.log("C");
    } else {
        console.log("D");
    }
}


// 문제 3: 나이를 입력받아 성인인지 미성년자인지 출력하세요.

function adult(age) {
    if (age >= 20) {
        console.log("성인")
    } else {
        console.log("미성년자")
    }
}


// 문제 4: switch문을 사용하여 요일을 출력하세요.
function  aa (day) {
    switch (day) {
        case 0:
            console.log("월요일");
            break;
        case 1:
            console.log("화요일");
            break;
        case 2:
            console.log("수요일");
            break;
        case 3:
            console.log("목요일");
            break;
        case 4:
            console.log("금요일");
            break;
        case 5:
            console.log("토요일");
            break;
        case 6:
            console.log("일요일");
            break;
    }
}



// 문제 5: 두 숫자를 비교하여 큰 수를 출력하세요.

function bigNum(a,b) {
    if (a>b) {
        console.log(a)
    } else {
        console.log(b)
    }
}
