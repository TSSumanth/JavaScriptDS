let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let sum = 0;
for (let num of arr) {
    sum += num;
}
console.log(sum)

console.log(arr.shift())
console.log(arr.unshift(0))
console.log(arr)