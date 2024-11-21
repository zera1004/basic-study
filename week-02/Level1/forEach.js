const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
]

// forEach를 이용하여 objArray의 name을 모두 출력
objArray.forEach( i => {
    console.log(i.name)
})