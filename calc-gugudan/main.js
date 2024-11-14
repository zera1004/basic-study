// 필요한 모듈을 불러옵니다.
import readlineSync from 'readline-sync';

// 프로그램 시작
function main() {
    // 사용자로부터 입력을 받습니다.
    while (true) {
        let choice = readlineSync.question(
            `
1. 사칙연산 계산기
2. 구구단 출력기 (2~9단)
3. 종료하기
선택하세요: `)

        switch (choice) {
            case '1':
                calculator();
                break;
            case '2':
                printMultiplicationTable();
                break;
            case '3':
                return;
            default:
                console.log("\n1, 2, 3 중에 입력하세요")
        }

        // 입력에 따라 해당 기능을 실행합니다.
    }

}

// 사칙연산 계산기 함수
function calculator() {
    // 여기에 코드를 작성하세요.
    while (true) {
        let num1 = 0;
        let calC = '';
        let num2 = 0;
        let again = '';

        while (true) {
            num1 = Number(readlineSync.question(`\n첫번째 숫자를 입력하세요: `));
            if (num1 / 1) {
                break;
            } else {
                console.log("\n숫자가 아닙니다. 다시입력해주세요\n")
            }
        }

        while (true) {
            calC = readlineSync.question(`연산 기호를 입력하세요 [+,-,x,/]: `);
            switch (calC) {
                case '+':
                case '-':
                case 'x':
                case '/':
                    break;
                default:
                    console.log(`\n보기에 있는 연산기호를 입력해주세요\n`)
                    continue;
            }
            break;
        }

        while (true) {
            num2 = Number(readlineSync.question(`두번 숫자를 입력하세요: `));
            if (num2 / 1) {
                break;
            } else {
                console.log("\n숫자가 아닙니다. 다시입력해주세요\n")
            }
        }

        switch (calC) {
            case '+':
                console.log(`${num1} + ${num2} = ${num1 + num2}`)
                break;
            case '-':
                console.log(`${num1} - ${num2} = ${num1 - num2}`)
                break;
            case 'x':
                console.log(`${num1} x ${num2} = ${num1 * num2}`)
                break;
            case '/':
                console.log(`${num1} / ${num2} = ${num1 / num2}`)
                break;
        }

        while (true) {
            again = readlineSync.question(`다시 하시겠습니까? [y/n]: `);
            if (again == 'y' || again == 'n') {
                break;
            } else {
                continue;
            }
        }

        if (again == 'n') {
            break;
        }
    }
}

// 구구단 출력 함수
function printMultiplicationTable() {
    // 여기에 코드를 작성하세요.
    console.log("--------------")
    for (let i = 2; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            console.log(`${i} x ${j} = ${i * j}`)
        }
        console.log("--------------")
    }
}

// 프로그램 실행
main();
