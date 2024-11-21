const objArray = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'grape', price: 300 },
]

// myFilter 를 구현하여 arr.filter 와 동일한 값이 나오도록 하기.
function myFilter(arr, callback) {
    // myFilter 구현
    let result =[];
    for (let i = 0; i < arr.length; i ++) {
        if (callback(arr[i]) === true) result.push(arr[i])
    }
    return result;
}