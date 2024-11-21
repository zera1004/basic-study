const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
]

// findIndex를 이용하여 name 이 apple 인 객체의 index 찾기
console.log(objArray.findIndex( i => i.name === 'apple'))