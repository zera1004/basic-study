const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
]

// find를 이용하여 name 이 grape 인 객체를 찾기
console.log(objArray.find( i => i.name === 'grape'))