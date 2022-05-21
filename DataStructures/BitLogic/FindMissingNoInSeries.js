let arr = [1, 2, 3, 4, 5];
let missing = 0;
for (let i = 0; i < arr.length; i++) {
    missing = missing ^ arr[i] ^ i + 1
}
missing = missing ^ arr.length + 1
console.log(missing);

/*
*   X ^ X = 0
*   X ^ 0 = X
*   X ^ X ^ X = X
*/
